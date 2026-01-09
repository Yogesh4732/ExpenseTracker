package com.example.ExpenseTrackerBackend.service;

import com.example.ExpenseTrackerBackend.model.Income;
import com.example.ExpenseTrackerBackend.model.User;
import com.example.ExpenseTrackerBackend.repository.IncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncomeService {
    @Autowired
    private IncomeRepository incomeRepository;

    public List<Income> getIncomesForUser(User user, String sortField, String sortOrder, String source) {
        List<Income> incomes = incomeRepository.findByUser(user);
        // Filter by source if provided
        if (source != null && !source.isEmpty()) {
            incomes = incomes.stream()
                .filter(i -> source.equalsIgnoreCase(i.getSource().name()))
                .toList();
        }
        // Sort by field/order if provided
        if (sortField != null && !sortField.isEmpty()) {
            incomes = incomes.stream()
                    .sorted((a, b) -> {
                        int cmp = 0;
                        switch (sortField) {
                            case "amount":
                                cmp = Double.compare(a.getAmount(), b.getAmount());
                                break;
                            case "date":
                                cmp = a.getDate().compareTo(b.getDate());
                                break;
                            case "source":
                                cmp = a.getSource().compareTo(b.getSource());
                                break;
                        }
                        return "desc".equalsIgnoreCase(sortOrder) ? -cmp : cmp;
                    })
                    .toList();
        }
        return incomes;
    }

    public Income addIncome(Income income) {
        return incomeRepository.save(income);
    }

    public void deleteIncome(Long id) {
        incomeRepository.deleteById(id);
    }
}
