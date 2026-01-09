import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExpenseList = ({ token, refresh }) => {
  const [expenses, setExpenses] = useState([]);
  const [sortField, setSortField] = useState('category');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedCategory, setSelectedCategory] = useState('PERSONAL');

  const categoryOrder = ['PERSONAL', 'SURVIVAL_LIVELIHOOD', 'INVESTMENT'];

  useEffect(() => {
    const params = {
      sortField,
      sortOrder,
      category: sortField === 'category' ? selectedCategory : undefined
    };
    axios.get('/api/expenses', {
      headers: { Authorization: `Bearer ${token}` },
      params
    }).then(res => {
      const data = Array.isArray(res.data) ? res.data : [];
      setExpenses(data);
    }).catch(() => setExpenses([]));
  }, [token, sortField, sortOrder, selectedCategory, refresh]);

  const handleRemove = async (id) => {
    await axios.delete(`/api/expenses/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setExpenses(expenses.filter(e => e.id !== id));
  };

  // Use expenses directly from backend
  const sortedExpenses = expenses;

  return (
    <div className="list-card">
      <h3>Expense List</h3>
      <div style={{ marginBottom: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <label>Sort by:</label>
        <select value={sortField} onChange={e => setSortField(e.target.value)}>
          <option value="category">Category</option>
          <option value="amount">Amount</option>
          <option value="date">Date</option>
        </select>
        {sortField === 'category' ? (
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
            {categoryOrder.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        ) : (
          <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        )}
      </div>
      <ul>
        {sortedExpenses.map(expense => (
          <li key={expense.id}>
            <span>
              <strong>{expense.description}</strong> | {expense.category} | ₹{expense.amount} | {expense.date}
            </span>
            <button onClick={() => handleRemove(expense.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
