import React from 'react';
import PnLDisplay from '../components/PnLDisplay';
import ExpenseList from '../components/ExpenseList';
import IncomeList from '../components/IncomeList';
import ExpenseForm from '../components/ExpenseForm';
import IncomeForm from '../components/IncomeForm';

const DashboardPage = ({ token }) => {
  const localUsername = localStorage.getItem('username');
  const [expenseRefresh, setExpenseRefresh] = React.useState(0);
  const [incomeRefresh, setIncomeRefresh] = React.useState(0);
  const refreshExpenses = () => setExpenseRefresh(r => r + 1);
  const refreshIncomes = () => setIncomeRefresh(r => r + 1);
  // Prevent rendering if not logged in
  if (!token || !localUsername) {
    window.location.replace('/login');
    return null;
  }
  return (
    <div className="container">
      <div className="dashboard-welcome">
        <h2>Dashboard</h2>
        <h3>Welcome, {localUsername}!</h3>
      </div>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h4>Your Expenses</h4>
          <ExpenseForm token={token} onAdd={refreshExpenses} />
          <ExpenseList token={token} refresh={expenseRefresh} />
        </div>
        <div className="dashboard-card">
          <h4>Your Income</h4>
          <IncomeForm token={token} onAdd={refreshIncomes} />
          <IncomeList token={token} refresh={incomeRefresh} />
        </div>
      </div>
      <PnLDisplay token={token} refresh={[expenseRefresh, incomeRefresh]} />
    </div>
  );
};

export default DashboardPage;
