package com.insurecore.insurecore.repository;

import com.insurecore.insurecore.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}