package com.insurecore.insurecore.controller;

import com.insurecore.insurecore.entity.InsuranceProduct;
import com.insurecore.insurecore.service.InsuranceProductService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class InsuranceProductController {

    private final InsuranceProductService productService;

    public InsuranceProductController(
            InsuranceProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public InsuranceProduct createProduct(
            @RequestBody InsuranceProduct product) {

        return productService.createProduct(product);
    }

    @GetMapping
    public List<InsuranceProduct> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public InsuranceProduct getProductById(
            @PathVariable Long id) {

        return productService.getProductById(id);
    }

    @PutMapping("/{id}")
    public InsuranceProduct updateProduct(
            @PathVariable Long id,
            @RequestBody InsuranceProduct product) {

        return productService.updateProduct(id, product);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}