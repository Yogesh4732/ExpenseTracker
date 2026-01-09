package com.example.ExpenseTrackerBackend.controller;

import com.example.ExpenseTrackerBackend.config.JwtUtil;
import com.example.ExpenseTrackerBackend.model.User;
import com.example.ExpenseTrackerBackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.json.JSONObject;

@RestController
@RequestMapping("/api/auth")
public class GoogleAuthController {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserService userService;

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody GoogleCredentialRequest request) {
        try {
            // Verify Google token
            String googleApiUrl = "https://oauth2.googleapis.com/tokeninfo?id_token=" + request.getCredential();
            RestTemplate restTemplate = new RestTemplate();
            String result = restTemplate.getForObject(googleApiUrl, String.class);
            JSONObject json = new JSONObject(result);
            String email = json.getString("email");
            // You can also get name, picture, etc. if needed

            // Find or create user
            User user = userService.findByUsername(email);
            if (user == null) {
                user = new User();
                user.setUsername(email);
                user.setPassword(""); // No password for Google users
                user = userService.registerGoogleUser(user);
            }
            String token = jwtUtil.generateToken(user.getUsername());
            return ResponseEntity.ok().body(new GoogleAuthResponse(token, user.getUsername()));
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid Google token");
        }
    }

    public static class GoogleCredentialRequest {
        private String credential;
        public String getCredential() { return credential; }
        public void setCredential(String credential) { this.credential = credential; }
    }

    public static class GoogleAuthResponse {
        private String token;
        private String username;
        public GoogleAuthResponse(String token, String username) {
            this.token = token;
            this.username = username;
        }
        public String getToken() { return token; }
        public String getUsername() { return username; }
    }
}
