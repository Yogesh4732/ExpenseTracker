import React, { useState } from 'react';
import axios from 'axios';

const IncomeForm = ({ token, onAdd }) => {
  const [description, setDescription] = useState('');
  const [source, setSource] = useState('SALARY');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/incomes', { description, source, amount, date }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Income added!');
      setDescription(''); setSource('SALARY'); setAmount(''); setDate('');
      if (typeof onAdd === 'function') onAdd();
    } catch (err) {
      setMessage('Error adding income');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
      <select value={source} onChange={e => setSource(e.target.value)}>
        <option value="FROM_INVESTMENT">From Investment</option>
        <option value="SALARY">Salary</option>
        <option value="FROM_TRADING">From Trading</option>
      </select>
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" required />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <button type="submit">Add Income</button>
      <div>{message}</div>
    </form>
  );
};

export default IncomeForm;
