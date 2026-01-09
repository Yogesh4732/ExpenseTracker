import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      const token = response.data;
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('username', username);
      setMessage('Login successful!');
      setSuccess(true);
      onLogin && onLogin(token, username);
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      setMessage(err.response?.data || 'Login failed');
      setSuccess(false);
    }
  };

  // Google login handler
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      // Send Google credential to backend for verification and user creation
      const response = await axios.post('/api/auth/google', { credential: credentialResponse.credential });
      const { token, username } = response.data;
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('username', username);
      setMessage('Login with Google successful!');
      setSuccess(true);
      onLogin && onLogin(token, username);
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      setMessage('Google login failed');
      setSuccess(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <div style={{ margin: '18px 0' }}>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={() => setMessage('Google login failed')}
        />
      </div>
      <div className={`message${success && message ? ' success' : (!success && message ? ' error' : '')}`}>{message}</div>
    </div>
  );
};

export default LoginPage;
