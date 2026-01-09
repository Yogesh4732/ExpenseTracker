package com.example.ExpenseTrackerBackend.controller;

import com.example.ExpenseTrackerBackend.model.Income;
import com.example.ExpenseTrackerBackend.service.IncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.security.core.Authentication;
import com.example.ExpenseTrackerBackend.model.User;
import com.example.ExpenseTrackerBackend.service.UserService;

@RestController
@RequestMapping("/api/incomes")
public class IncomeController {
    @Autowired
    private IncomeService incomeService;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<Income> getAllIncomes(
            Authentication authentication,
            @RequestParam(required = false) String sortField,
            @RequestParam(required = false) String sortOrder,
            @RequestParam(required = false) String source
    ) {
        String username = authentication.getName();
        User user = userService.findByUsername(username);
        return incomeService.getIncomesForUser(user, sortField, sortOrder, source);
    }

    @PostMapping
    public Income addIncome(@RequestBody Income income, Authentication authentication) {
        String username = authentication.getName();
        User user = userService.findByUsername(username);
        income.setUser(user);
        return incomeService.addIncome(income);
    }

    @DeleteMapping("/{id}")
    public void deleteIncome(@PathVariable Long id) {
        incomeService.deleteIncome(id);
    }
}
