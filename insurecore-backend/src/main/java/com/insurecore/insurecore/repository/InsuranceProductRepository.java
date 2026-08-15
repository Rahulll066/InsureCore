package com.insurecore.insurecore.repository;

import com.insurecore.insurecore.entity.InsuranceProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InsuranceProductRepository
        extends JpaRepository<InsuranceProduct, Long> {
}