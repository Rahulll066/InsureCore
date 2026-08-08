package com.insurecore.insurecore.repository;

import com.insurecore.insurecore.entity.Policy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PolicyRepository extends JpaRepository<Policy, Long> {

    boolean existsByPolicyNumber(String policyNumber);
}