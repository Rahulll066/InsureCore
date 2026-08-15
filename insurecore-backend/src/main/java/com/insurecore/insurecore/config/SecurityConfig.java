package com.insurecore.insurecore.config;

import com.insurecore.insurecore.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .cors(cors -> {})

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable())

                .authorizeHttpRequests(auth -> auth

                        // Public
                        .requestMatchers(
                                "/api/v1/auth/**",
                                "/error"
                        ).permitAll()

                        // Admin
                        .requestMatchers(
                                "/api/v1/products/**"
                        ).hasRole("ADMIN")

                        // Customer + Agent + Admin
                        .requestMatchers(
                                "/api/v1/quotes/**",
                                "/api/v1/policies/**",
                                "/api/v1/claims/**"
                        ).hasAnyRole(
                                "CUSTOMER",
                                "AGENT",
                                "ADMIN"
                        )

                        // Customer + Admin
                        .requestMatchers(
                                "/api/v1/payments/**"
                        ).hasAnyRole(
                                "CUSTOMER",
                                "ADMIN"
                        )

                        // Customers
                        .requestMatchers(
                                "/api/v1/customers/**"
                        ).hasAnyRole(
                                "CUSTOMER",
                                "ADMIN"
                        )

                        .anyRequest().authenticated()
                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}