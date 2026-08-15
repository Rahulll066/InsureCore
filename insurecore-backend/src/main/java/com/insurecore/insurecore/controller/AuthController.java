package com.insurecore.insurecore.controller;

import com.insurecore.insurecore.dto.LoginRequest;
import com.insurecore.insurecore.dto.LoginResponse;
import com.insurecore.insurecore.dto.RegisterRequest;
import com.insurecore.insurecore.entity.User;
import com.insurecore.insurecore.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public User register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }
}