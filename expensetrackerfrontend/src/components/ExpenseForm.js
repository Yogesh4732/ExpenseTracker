import React, { useState } from 'react';
import axios from 'axios';

const ExpenseForm = ({ token, onAdd }) => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('PERSONAL');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/expenses', { description, category, amount, date }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Expense added!');
      setDescription(''); setCategory('PERSONAL'); setAmount(''); setDate('');
      if (typeof onAdd === 'function') onAdd();
    } catch (err) {
      setMessage('Error adding expense');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="PERSONAL">Personal</option>
        <option value="SURVIVAL_LIVELIHOOD">Survival/Livelihood</option>
        <option value="INVESTMENT">Investment</option>
      </select>
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" required />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <button type="submit">Add Expense</button>
      <div>{message}</div>
    </form>
  );
};

export default ExpenseForm;
