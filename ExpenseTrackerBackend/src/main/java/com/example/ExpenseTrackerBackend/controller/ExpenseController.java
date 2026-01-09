package com.example.ExpenseTrackerBackend.controller;

import com.example.ExpenseTrackerBackend.model.Expense;
import com.example.ExpenseTrackerBackend.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.security.core.Authentication;
import com.example.ExpenseTrackerBackend.model.User;
import com.example.ExpenseTrackerBackend.service.UserService;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<Expense> getAllExpenses(Authentication authentication) {
        String username = authentication.getName();
        User user = userService.findByUsername(username);
        // Pass null for sortField, sortOrder, and category for default behavior
        return expenseService.getExpensesForUser(user, null, null, null);
    }

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense, Authentication authentication) {
        String username = authentication.getName();
        User user = userService.findByUsername(username);
        expense.setUser(user);
        return expenseService.addExpense(expense);
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
    }
}
