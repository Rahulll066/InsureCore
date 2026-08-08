package com.insurecore.insurecore.controller;

import com.insurecore.insurecore.entity.Claim;
import com.insurecore.insurecore.service.ClaimService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/claims")
public class ClaimController {

    private final ClaimService claimService;

    public ClaimController(ClaimService claimService) {
        this.claimService = claimService;
    }

    @PostMapping("/policy/{policyId}")
    public Claim fileClaim(
            @PathVariable Long policyId,
            @RequestBody Claim claim) {

        return claimService.fileClaim(policyId, claim);
    }

    @GetMapping
    public List<Claim> getAllClaims() {
        return claimService.getAllClaims();
    }

    @GetMapping("/{id}")
    public Claim getClaimById(@PathVariable Long id) {
        return claimService.getClaimById(id);
    }

    @PutMapping("/{id}/approve")
    public Claim approveClaim(@PathVariable Long id) {
        return claimService.approveClaim(id);
    }

    @PutMapping("/{id}/reject")
    public Claim rejectClaim(@PathVariable Long id) {
        return claimService.rejectClaim(id);
    }

    @PutMapping("/{id}/settle")
    public Claim settleClaim(@PathVariable Long id) {
        return claimService.settleClaim(id);
    }
}