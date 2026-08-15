package com.insurecore.insurecore.service;

import com.insurecore.insurecore.entity.Claim;
import com.insurecore.insurecore.entity.ClaimStatus;
import com.insurecore.insurecore.entity.Policy;
import com.insurecore.insurecore.repository.ClaimRepository;
import com.insurecore.insurecore.repository.PolicyRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class ClaimService {

    private final ClaimRepository claimRepository;
    private final PolicyRepository policyRepository;

    public ClaimService(
            ClaimRepository claimRepository,
            PolicyRepository policyRepository) {
        this.claimRepository = claimRepository;
        this.policyRepository = policyRepository;
    }

    public Claim fileClaim(
            Long policyId,
            Claim claim) {

        Policy policy = policyRepository.findById(policyId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Policy with id " + policyId + " not found"));

        if (!"ACTIVE".equals(policy.getStatus().name())) {
            throw new RuntimeException(
                    "Claims can only be filed for active policies");
        }

        claim.setPolicy(policy);

        claim.setClaimNumber(
                "CLM-" + UUID.randomUUID()
                        .toString()
                        .substring(0, 8)
                        .toUpperCase()
        );

        claim.setStatus(ClaimStatus.FILED);
        claim.setFiledDate(LocalDate.now());

        return claimRepository.save(claim);
    }

    public List<Claim> getAllClaims() {
        return claimRepository.findAll();
    }

    public Claim getClaimById(Long id) {
        return claimRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Claim with id " + id + " not found"));
    }

    public Claim approveClaim(Long id) {

        Claim claim = getClaimById(id);

        if (claim.getStatus() != ClaimStatus.FILED) {
            throw new RuntimeException(
                    "Only filed claims can be approved");
        }

        claim.setStatus(ClaimStatus.APPROVED);

        return claimRepository.save(claim);
    }

    public Claim rejectClaim(Long id) {

        Claim claim = getClaimById(id);

        if (claim.getStatus() != ClaimStatus.FILED) {
            throw new RuntimeException(
                    "Only filed claims can be rejected");
        }

        claim.setStatus(ClaimStatus.REJECTED);

        return claimRepository.save(claim);
    }

    public Claim settleClaim(Long id) {

        Claim claim = getClaimById(id);

        if (claim.getStatus() != ClaimStatus.APPROVED) {
            throw new RuntimeException(
                    "Only approved claims can be settled");
        }

        claim.setStatus(ClaimStatus.SETTLED);

        return claimRepository.save(claim);
    }
}