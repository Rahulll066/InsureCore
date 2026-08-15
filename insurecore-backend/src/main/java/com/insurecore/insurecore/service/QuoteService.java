package com.insurecore.insurecore.service;

import com.insurecore.insurecore.entity.Customer;
import com.insurecore.insurecore.entity.InsuranceProduct;
import com.insurecore.insurecore.entity.Quote;
import com.insurecore.insurecore.entity.QuoteStatus;
import com.insurecore.insurecore.repository.CustomerRepository;
import com.insurecore.insurecore.repository.InsuranceProductRepository;
import com.insurecore.insurecore.repository.QuoteRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class QuoteService {

    private final QuoteRepository quoteRepository;
    private final CustomerRepository customerRepository;
    private final InsuranceProductRepository productRepository;

    public QuoteService(
            QuoteRepository quoteRepository,
            CustomerRepository customerRepository,
            InsuranceProductRepository productRepository) {

        this.quoteRepository = quoteRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
    }

    public Quote createQuote(
            Long customerId,
            Long productId) {

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Customer with id " + customerId + " not found"));

        InsuranceProduct product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Insurance product with id " + productId + " not found"));

        Quote quote = new Quote();

        quote.setCustomer(customer);
        quote.setInsuranceProduct(product);

        // Simple premium calculation for now.
        BigDecimal premium = product.getBasePremium();

        quote.setPremium(premium);
        quote.setStatus(QuoteStatus.PENDING);
        quote.setCreatedAt(LocalDateTime.now());
        quote.setValidUntil(LocalDate.now().plusDays(30));

        return quoteRepository.save(quote);
    }

    public List<Quote> getAllQuotes() {
        return quoteRepository.findAll();
    }

    public Quote getQuoteById(Long id) {
        return quoteRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Quote with id " + id + " not found"));
    }

    public Quote acceptQuote(Long id) {

        Quote quote = getQuoteById(id);

        if (quote.getStatus() != QuoteStatus.PENDING) {
            throw new RuntimeException(
                    "Only pending quotes can be accepted");
        }

        if (quote.getValidUntil().isBefore(LocalDate.now())) {
            quote.setStatus(QuoteStatus.EXPIRED);
            quoteRepository.save(quote);

            throw new RuntimeException("Quote has expired");
        }

        quote.setStatus(QuoteStatus.ACCEPTED);

        return quoteRepository.save(quote);
    }
}