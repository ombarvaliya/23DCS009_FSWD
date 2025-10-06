import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Nav() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch user info on mount and whenever location changes (login/logout/register)
  useEffect(() => {
    fetch(import.meta.env.VITE_API_BASE + '/auth/me', {
      credentials: 'include'
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.user) setUser(data.user);
        else setUser(null);
      }).catch(() => setUser(null));
  }, [location]);

  async function logout() {
    await fetch(import.meta.env.VITE_API_BASE + '/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    setUser(null);
    navigate('/');
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-30 border-b border-indigo-100">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-pink-400 to-yellow-400 flex items-center justify-center text-white font-extrabold text-2xl shadow-md animate-pulse">A</div>
          <Link to="/" className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow">AuthPortal</Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {user ? (
            <>
              <span className="text-base text-slate-600 hidden sm:inline">Hello, <strong className="text-indigo-600">{user.name?.toUpperCase()}</strong></span>
              <Link to="/dashboard" className="py-2 px-5 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-400 text-white font-semibold shadow-md text-base transition-all duration-200 hover:scale-105">Dashboard</Link>
              <button onClick={logout} className="py-2 px-5 rounded-lg border-2 border-pink-200 text-pink-600 font-semibold text-base bg-white shadow-sm transition-all duration-200 hover:bg-pink-50">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="py-2 px-5 rounded-lg border-2 border-indigo-200 text-indigo-600 font-semibold text-base bg-white shadow-sm transition-all duration-200 hover:bg-indigo-50">Login</Link>
              <Link to="/register" className="py-2 px-5 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-400 text-white font-semibold shadow-md text-base transition-all duration-200 hover:scale-105">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
