package com.example.ExpenseTrackerBackend.controller;

import com.example.ExpenseTrackerBackend.service.PnLService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;
import org.springframework.security.core.Authentication;
import com.example.ExpenseTrackerBackend.model.User;
import com.example.ExpenseTrackerBackend.service.UserService;

@RestController
@RequestMapping("/api/pnl")
public class PnLController {
    @Autowired
    private PnLService pnlService;

    @Autowired
    private UserService userService;

    @GetMapping
    public Map<String, Double> getTotalPnL(Authentication authentication) {
        String username = authentication.getName();
        User user = userService.findByUsername(username);
        double totalPnL = pnlService.getTotalPnL(user);
        Map<String, Double> result = new HashMap<>();
        result.put("totalPnL", totalPnL);
        return result;
    }
}
