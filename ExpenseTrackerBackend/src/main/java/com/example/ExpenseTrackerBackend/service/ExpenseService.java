package com.example.ExpenseTrackerBackend.service;

import com.example.ExpenseTrackerBackend.model.Expense;
import com.example.ExpenseTrackerBackend.repository.ExpenseRepository;
import com.example.ExpenseTrackerBackend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {
    @Autowired
    private ExpenseRepository expenseRepository;

    public List<Expense> getExpensesForUser(User user, String sortField, String sortOrder, String category) {
        List<Expense> expenses = expenseRepository.findByUser(user);
        // Filter by category if provided
        if (category != null && !category.isEmpty()) {
            expenses = expenses.stream()
                .filter(e -> category.equalsIgnoreCase(e.getCategory().name()))
                .toList();
        }
        // Sort by field/order if provided
        if (sortField != null && !sortField.isEmpty()) {
            expenses = expenses.stream()
                    .sorted((a, b) -> {
                        int cmp = 0;
                        switch (sortField) {
                            case "amount":
                                cmp = Double.compare(a.getAmount(), b.getAmount());
                                break;
                            case "date":
                                cmp = a.getDate().compareTo(b.getDate());
                                break;
                            case "category":
                                cmp = a.getCategory().compareTo(b.getCategory());
                                break;
                        }
                        return "desc".equalsIgnoreCase(sortOrder) ? -cmp : cmp;
                    })
                    .toList();
        }
        return expenses;
    }

    public Expense addExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }
}
