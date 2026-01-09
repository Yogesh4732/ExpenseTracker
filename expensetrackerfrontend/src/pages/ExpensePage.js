import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import FilterSortBar from '../components/FilterSortBar';

const ExpensePage = ({ token }) => {
  return (
    <div className="container">
      <h2>Expenses</h2>
      <ExpenseForm token={token} />
      <FilterSortBar type="expense" />
      <ExpenseList token={token} />
    </div>
  );
};

export default ExpensePage;
