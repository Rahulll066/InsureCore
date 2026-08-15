package com.insurecore.insurecore.controller;

import com.insurecore.insurecore.entity.Quote;
import com.insurecore.insurecore.service.QuoteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/quotes")
public class QuoteController {

    private final QuoteService quoteService;

    public QuoteController(QuoteService quoteService) {
        this.quoteService = quoteService;
    }

    @PostMapping
    public Quote createQuote(
            @RequestParam Long customerId,
            @RequestParam Long productId) {

        return quoteService.createQuote(customerId, productId);
    }

    @GetMapping
    public List<Quote> getAllQuotes() {
        return quoteService.getAllQuotes();
    }

    @GetMapping("/{id}")
    public Quote getQuoteById(@PathVariable Long id) {
        return quoteService.getQuoteById(id);
    }

    @PutMapping("/{id}/accept")
    public Quote acceptQuote(@PathVariable Long id) {
        return quoteService.acceptQuote(id);
    }
}