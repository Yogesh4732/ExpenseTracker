import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('jwtToken');

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
        {!isLoggedIn && <li><Link to="/signup">Signup</Link></li>}
        {isLoggedIn && <li><button onClick={handleLogout}>Logout</button></li>}
      </ul>
    </nav>
  );
};

export default Navbar;
