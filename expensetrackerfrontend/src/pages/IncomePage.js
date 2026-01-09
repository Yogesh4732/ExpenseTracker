import React from 'react';
import IncomeForm from '../components/IncomeForm';
import IncomeList from '../components/IncomeList';
import FilterSortBar from '../components/FilterSortBar';

const IncomePage = ({ token }) => {
  return (
    <div className="container">
      <h2>Income</h2>
      <IncomeForm token={token} />
      <FilterSortBar type="income" />
      <IncomeList token={token} />
    </div>
  );
};

export default IncomePage;
