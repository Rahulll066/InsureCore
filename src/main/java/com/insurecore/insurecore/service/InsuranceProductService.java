package com.insurecore.insurecore.service;

import com.insurecore.insurecore.entity.InsuranceProduct;
import com.insurecore.insurecore.exception.CustomerNotFoundException;
import com.insurecore.insurecore.repository.InsuranceProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InsuranceProductService {

    private final InsuranceProductRepository productRepository;

    public InsuranceProductService(
            InsuranceProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public InsuranceProduct createProduct(InsuranceProduct product) {
        return productRepository.save(product);
    }

    public List<InsuranceProduct> getAllProducts() {
        return productRepository.findAll();
    }

    public InsuranceProduct getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Insurance product with id " + id + " not found"
                        ));
    }

    public InsuranceProduct updateProduct(
            Long id,
            InsuranceProduct updatedProduct) {

        InsuranceProduct product = getProductById(id);

        product.setName(updatedProduct.getName());
        product.setType(updatedProduct.getType());
        product.setDescription(updatedProduct.getDescription());
        product.setCoverageAmount(updatedProduct.getCoverageAmount());
        product.setBasePremium(updatedProduct.getBasePremium());

        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        InsuranceProduct product = getProductById(id);
        productRepository.delete(product);
    }
}