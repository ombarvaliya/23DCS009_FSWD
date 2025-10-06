import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await login(form);
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        setErr(data?.message || JSON.stringify(data));
        return;
      }
      nav('/dashboard');
    } catch (error) {
      setLoading(false);
      setErr('Network error');
    }
  }

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-indigo-100 via-white to-pink-100 rounded-3xl shadow-2xl p-8 mt-10 border border-indigo-200">
      <div className="flex flex-col items-center mb-6">
        <div className="bg-gradient-to-br from-indigo-500 to-pink-400 rounded-full h-16 w-16 flex items-center justify-center shadow-lg mb-2">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12A4 4 0 1 1 8 12a4 4 0 0 1 8 0ZM12 14v6m0 0H9m3 0h3" /></svg>
        </div>
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-1">Login to your account</h2>
        <p className="text-slate-600 text-sm">Welcome back! Please enter your credentials.</p>
      </div>
      {err && <div className="mb-4 text-red-600 text-center font-medium animate-pulse">{err}</div>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-indigo-700 mb-1">Email</label>
          <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full mt-1 p-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/80" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-indigo-700 mb-1">Password</label>
          <input required type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
            className="w-full mt-1 p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80" placeholder="Your password" />
        </div>
        <button disabled={loading} className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-400 text-white font-semibold shadow-lg tracking-wide transition-all duration-200 hover:scale-105 disabled:opacity-60">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
