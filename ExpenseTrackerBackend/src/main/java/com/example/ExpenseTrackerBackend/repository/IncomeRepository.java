package com.example.ExpenseTrackerBackend.repository;

import com.example.ExpenseTrackerBackend.model.Income;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ExpenseTrackerBackend.model.User;
import java.util.List;

public interface IncomeRepository extends JpaRepository<Income, Long> {
	List<Income> findByUser(User user);
}
