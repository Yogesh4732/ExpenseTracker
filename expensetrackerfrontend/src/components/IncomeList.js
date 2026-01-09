import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IncomeList = ({ token, refresh }) => {
  const [incomes, setIncomes] = useState([]);
  const [sortField, setSortField] = useState('source');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedSource, setSelectedSource] = useState('FROM_INVESTMENT');

  // Custom source order
  const sourceOrder = ['FROM_INVESTMENT', 'SALARY', 'FROM_TRADING'];

  useEffect(() => {
    const params = {
      sortField,
      sortOrder,
      source: sortField === 'source' ? selectedSource : undefined
    };
    axios.get('/api/incomes', {
      headers: { Authorization: `Bearer ${token}` },
      params
    }).then(res => {
      const data = Array.isArray(res.data) ? res.data : [];
      setIncomes(data);
    }).catch(() => setIncomes([]));
  }, [token, sortField, sortOrder, selectedSource, refresh]);

  const handleRemove = async (id) => {
    await axios.delete(`/api/incomes/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setIncomes(incomes.filter(i => i.id !== id));
  };

  // Use incomes directly from backend
  const sortedIncomes = incomes;

  return (
    <div className="list-card">
      <h3>Income List</h3>
      <div style={{ marginBottom: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <label>Sort by:</label>
        <select value={sortField} onChange={e => setSortField(e.target.value)}>
          <option value="source">Source</option>
          <option value="amount">Amount</option>
          <option value="date">Date</option>
        </select>
        {sortField === 'source' ? (
          <select value={selectedSource} onChange={e => setSelectedSource(e.target.value)}>
            {sourceOrder.map(src => (
              <option key={src} value={src}>{src}</option>
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
        {sortedIncomes.map(income => (
          <li key={income.id}>
            <span>
              <strong>{income.description}</strong> | {income.source} | ₹{income.amount} | {income.date}
            </span>
            <button onClick={() => handleRemove(income.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncomeList;
