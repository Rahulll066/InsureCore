package com.insurecore.insurecore.service;

import com.insurecore.insurecore.entity.Payment;
import com.insurecore.insurecore.entity.PaymentStatus;
import com.insurecore.insurecore.entity.Policy;
import com.insurecore.insurecore.repository.PaymentRepository;
import com.insurecore.insurecore.repository.PolicyRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final PolicyRepository policyRepository;

    public PaymentService(
            PaymentRepository paymentRepository,
            PolicyRepository policyRepository) {
        this.paymentRepository = paymentRepository;
        this.policyRepository = policyRepository;
    }

    public Payment makePayment(Long policyId) {

        Policy policy = policyRepository.findById(policyId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Policy with id " + policyId + " not found"));

        if (!"ACTIVE".equals(policy.getStatus().name())) {
            throw new RuntimeException(
                    "Payment can only be made for active policies");
        }

        Payment payment = new Payment();

        payment.setPolicy(policy);
        payment.setAmount(policy.getPremium());
        payment.setTransactionId(
                "TXN-" + UUID.randomUUID()
                        .toString()
                        .substring(0, 8)
                        .toUpperCase()
        );
        payment.setStatus(PaymentStatus.SUCCESS);
        payment.setPaymentDate(LocalDateTime.now());

        return paymentRepository.save(payment);
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Payment with id " + id + " not found"));
    }
}