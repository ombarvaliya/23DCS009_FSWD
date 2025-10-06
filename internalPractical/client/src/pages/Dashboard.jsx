import React, { useEffect, useState } from 'react';
import { getMe } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const nav = useNavigate(); //chaged from navigate to nav
  useEffect(() => {
    async function fetchMe() {
      const res = await getMe();
      if (!res.ok) {
        nav('/login');
        return;
      }
      const data = await res.json();
      setUser(data.user);
    }
    fetchMe();
  }, []);

  if (!user) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
      <div className="text-lg text-slate-500 font-medium">Loading your dashboard...</div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-br from-indigo-100 via-white to-pink-100 rounded-3xl shadow-2xl p-8 mt-10 border border-indigo-200">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-gradient-to-br from-indigo-500 to-pink-400 rounded-full h-16 w-16 flex items-center justify-center shadow-lg">
          <span className="text-3xl text-white font-bold select-none">{user.name[0]}</span>
        </div>
        <div>
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-1">Welcome, {user.name} 👋</h2>
          <p className="text-slate-600 text-sm">Glad to see you back!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="p-6 rounded-2xl bg-white/80 shadow border border-indigo-100 flex flex-col items-center">
          <svg className="w-8 h-8 text-indigo-400 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12A4 4 0 1 1 8 12a4 4 0 0 1 8 0ZM12 14v6m0 0H9m3 0h3" /></svg>
          <h3 className="font-semibold text-indigo-700">Email</h3>
          <p className="text-sm text-slate-600">{user.email}</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/80 shadow border border-pink-100 flex flex-col items-center">
          <svg className="w-8 h-8 text-pink-400 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-9 4h6" /></svg>
          <h3 className="font-semibold text-pink-700">Account Created</h3>
          <p className="text-sm text-slate-600">{new Date(user.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <div className="text-center mt-8">
        <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-400 text-white font-semibold shadow-lg tracking-wide animate-pulse">Protected Dashboard</span>
      </div>
    </div>
  );
}
