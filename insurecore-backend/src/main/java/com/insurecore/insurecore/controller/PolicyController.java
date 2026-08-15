package com.insurecore.insurecore.controller;

import com.insurecore.insurecore.entity.Policy;
import com.insurecore.insurecore.service.PolicyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/policies")
public class PolicyController {

    private final PolicyService policyService;

    public PolicyController(PolicyService policyService) {
        this.policyService = policyService;
    }

    @PostMapping("/issue/{quoteId}")
    public Policy issuePolicy(@PathVariable Long quoteId) {
        return policyService.issuePolicy(quoteId);
    }

    @GetMapping
    public List<Policy> getAllPolicies() {
        return policyService.getAllPolicies();
    }

    @GetMapping("/{id}")
    public Policy getPolicyById(@PathVariable Long id) {
        return policyService.getPolicyById(id);
    }

    @PutMapping("/{id}/cancel")
    public Policy cancelPolicy(@PathVariable Long id) {
        return policyService.cancelPolicy(id);
    }

    @PutMapping("/{id}/renew")
    public Policy renewPolicy(@PathVariable Long id) {
        return policyService.renewPolicy(id);
    }
}