package com.insurecore.insurecore.repository;

import com.insurecore.insurecore.entity.Quote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuoteRepository extends JpaRepository<Quote, Long> {
}