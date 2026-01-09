import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/signup', { username, password });
      setMessage('Signup successful! Redirecting to login...');
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setMessage(err.response?.data || 'Signup failed');
      setSuccess(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
      <div className={`message${success && message ? ' success' : (!success && message ? ' error' : '')}`}>{message}</div>
    </div>
  );
};

export default SignupPage;
