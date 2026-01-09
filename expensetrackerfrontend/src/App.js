import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ExpensePage from './pages/ExpensePage';
import IncomePage from './pages/IncomePage';
import './App.css';
import axios from 'axios';

const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('jwtToken'));
  const [token, setToken] = useState(localStorage.getItem('jwtToken') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [googleClientId, setGoogleClientId] = useState('');

  useEffect(() => {
    axios.get('/api/auth/google-client-id').then(res => {
      setGoogleClientId(res.data.clientId);
    });
    // Listen for storage changes (logout from Navbar)
    const onStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('jwtToken'));
      setToken(localStorage.getItem('jwtToken') || '');
      setUsername(localStorage.getItem('username') || '');
    };
    window.addEventListener('storage', onStorageChange);
    return () => window.removeEventListener('storage', onStorageChange);
  }, []);

  // Redirect to login if logged out and not already on login/signup
  useEffect(() => {
    if (!isLoggedIn) {
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/signup') {
        window.location.replace('/login');
      }
    }
  }, [isLoggedIn]);

  const handleLogin = (jwt, user) => {
    setIsLoggedIn(true);
    setToken(jwt);
    setUsername(user);
  };

  if (!googleClientId) return <div>Loading...</div>;

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <HomePage />} />
            <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />} />
            <Route path="/signup" element={isLoggedIn ? <Navigate to="/dashboard" /> : <SignupPage />} />
            <Route path="/dashboard" element={<ProtectedRoute isLoggedIn={isLoggedIn}><DashboardPage token={token} username={username} /></ProtectedRoute>} />
            <Route path="/expenses" element={<ProtectedRoute isLoggedIn={isLoggedIn}><ExpensePage token={token} username={username} /></ProtectedRoute>} />
            <Route path="/income" element={<ProtectedRoute isLoggedIn={isLoggedIn}><IncomePage token={token} username={username} /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
