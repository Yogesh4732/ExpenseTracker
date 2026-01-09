package com.example.ExpenseTrackerBackend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class GoogleClientIdController {
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @GetMapping("/google-client-id")
    public Map<String, String> getGoogleClientId() {
        return Map.of("clientId", googleClientId);
    }
}
