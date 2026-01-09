import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="home-hero">
        <h1>ExpenseTracker</h1>
        <p style={{ fontSize: '1.3rem', marginBottom: '32px', maxWidth: 500 }}>
          Track your expenses and income with ease. Sign up or log in to get started!
        </p>
        <div className="home-btns">
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/signup')}>Signup</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
