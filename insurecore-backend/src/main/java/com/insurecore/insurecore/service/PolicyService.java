package com.insurecore.insurecore.service;

import com.insurecore.insurecore.entity.*;
import com.insurecore.insurecore.repository.PolicyRepository;
import com.insurecore.insurecore.repository.QuoteRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class PolicyService {

    private final PolicyRepository policyRepository;
    private final QuoteRepository quoteRepository;

    public PolicyService(
            PolicyRepository policyRepository,
            QuoteRepository quoteRepository) {

        this.policyRepository = policyRepository;
        this.quoteRepository = quoteRepository;
    }

    public Policy issuePolicy(Long quoteId) {

        Quote quote = quoteRepository.findById(quoteId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Quote with id " + quoteId + " not found"));

        if (quote.getStatus() != QuoteStatus.ACCEPTED) {
            throw new RuntimeException(
                    "Only accepted quotes can be converted to a policy");
        }

        Policy policy = new Policy();

        policy.setPolicyNumber(
                "POL-" + UUID.randomUUID()
                        .toString()
                        .substring(0, 8)
                        .toUpperCase()
        );

        policy.setCustomer(quote.getCustomer());
        policy.setInsuranceProduct(quote.getInsuranceProduct());
        policy.setQuote(quote);
        policy.setPremium(quote.getPremium());

        policy.setStartDate(LocalDate.now());
        policy.setEndDate(LocalDate.now().plusYears(1));

        policy.setStatus(PolicyStatus.ACTIVE);

        return policyRepository.save(policy);
    }

    public List<Policy> getAllPolicies() {
        return policyRepository.findAll();
    }

    public Policy getPolicyById(Long id) {
        return policyRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Policy with id " + id + " not found"));
    }

    public Policy cancelPolicy(Long id) {

        Policy policy = getPolicyById(id);

        if (policy.getStatus() != PolicyStatus.ACTIVE) {
            throw new RuntimeException(
                    "Only active policies can be cancelled");
        }

        policy.setStatus(PolicyStatus.CANCELLED);

        return policyRepository.save(policy);
    }

    public Policy renewPolicy(Long id) {

        Policy policy = getPolicyById(id);

        if (policy.getStatus() != PolicyStatus.EXPIRED) {
            throw new RuntimeException(
                    "Only expired policies can be renewed");
        }

        policy.setStartDate(LocalDate.now());
        policy.setEndDate(LocalDate.now().plusYears(1));
        policy.setStatus(PolicyStatus.ACTIVE);

        return policyRepository.save(policy);
    }
}