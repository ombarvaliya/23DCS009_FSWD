import React, { useState } from 'react';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await register(form);
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
    <div className="max-w-md mx-auto bg-gradient-to-br from-pink-100 via-white to-indigo-100 rounded-3xl shadow-2xl p-8 mt-10 border border-pink-200">
      <div className="flex flex-col items-center mb-6">
        <div className="bg-gradient-to-br from-pink-400 to-indigo-500 rounded-full h-16 w-16 flex items-center justify-center shadow-lg mb-2">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 2c-2.21 0-4 1.79-4 4v1h8v-1c0-2.21-1.79-4-4-4z" /></svg>
        </div>
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 to-indigo-600 bg-clip-text text-transparent mb-1">Create an account</h2>
        <p className="text-slate-600 text-sm">Join us and start your journey!</p>
      </div>
      {err && <div className="mb-4 text-red-600 text-center font-medium animate-pulse">{err}</div>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-pink-700 mb-1">Name</label>
          <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full mt-1 p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80" placeholder="Your name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-indigo-700 mb-1">Email</label>
          <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full mt-1 p-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/80" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-indigo-700 mb-1">Password</label>
          <input required type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
            className="w-full mt-1 p-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/80" placeholder="6+ characters" />
        </div>

        <button disabled={loading} className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold shadow-lg tracking-wide transition-all duration-200 hover:scale-105 disabled:opacity-60">
          {loading ? 'Registering...' : 'Create account'}
        </button>
      </form>
    </div>
  );
}
