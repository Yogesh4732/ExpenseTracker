package com.example.ExpenseTrackerBackend.repository;

import com.example.ExpenseTrackerBackend.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ExpenseTrackerBackend.model.User;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
	List<Expense> findByUser(User user);
}
