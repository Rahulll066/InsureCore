package com.insurecore.insurecore.repository;

import com.insurecore.insurecore.entity.Claim;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClaimRepository extends JpaRepository<Claim, Long> {
}