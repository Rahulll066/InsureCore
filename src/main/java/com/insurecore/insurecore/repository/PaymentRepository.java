package com.insurecore.insurecore.repository;

import com.insurecore.insurecore.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}