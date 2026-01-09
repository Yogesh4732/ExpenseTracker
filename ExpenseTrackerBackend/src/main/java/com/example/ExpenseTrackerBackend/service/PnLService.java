package com.example.ExpenseTrackerBackend.service;

import com.example.ExpenseTrackerBackend.repository.ExpenseRepository;
import com.example.ExpenseTrackerBackend.repository.IncomeRepository;
import com.example.ExpenseTrackerBackend.model.Expense;
import com.example.ExpenseTrackerBackend.model.Income;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PnLService {
    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private IncomeRepository incomeRepository;

    public double getTotalPnL(com.example.ExpenseTrackerBackend.model.User user) {
        List<Expense> expenses = expenseRepository.findByUser(user);
        List<Income> incomes = incomeRepository.findByUser(user);
        double totalExpense = expenses.stream().mapToDouble(Expense::getAmount).sum();
        double totalIncome = incomes.stream().mapToDouble(Income::getAmount).sum();
        return totalIncome - totalExpense;
    }
}
