import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 shadow flex items-center justify-between">
      <Link to="/" className="font-bold text-xl tracking-wide">User Dashboard</Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="hidden sm:inline">{user.name} ({user.userType})</span>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition">Logout</button>
            <Link to="/dashboard" className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-blue-100 transition">Dashboard</Link>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-blue-100 transition">Login</Link>
            <Link to="/signup" className="bg-white text-purple-700 px-3 py-1 rounded hover:bg-purple-100 transition">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
