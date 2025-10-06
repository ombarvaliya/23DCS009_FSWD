import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto text-center py-24 px-4">
      <div className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-pink-400 text-white font-bold text-lg shadow-lg mb-8 animate-pulse">MERN Auth Portal</div>
      <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-indigo-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">Secure Authentication</h1>
      <p className="mb-10 text-lg text-slate-600 font-medium">A simple, secure user authentication portal built with <span className="text-indigo-500 font-bold">MERN</span> + <span className="text-pink-500 font-bold">Tailwind</span>. Register, login and access a protected dashboard.</p>
      <div className="flex justify-center gap-6 mb-4">
        <Link to="/register" className="py-3 px-8 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-400 text-white font-semibold shadow-xl text-lg transition-all duration-200 hover:scale-105">Get Started</Link>
        <Link to="/login" className="py-3 px-8 rounded-xl border-2 border-indigo-200 bg-white text-indigo-700 font-semibold shadow text-lg transition-all duration-200 hover:scale-105">Already have account?</Link>
      </div>
      <div className="mt-12 flex justify-center">
        <svg className="w-32 h-32 opacity-80" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" style={{ stopColor: '#6C63FF', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#FF6B6B', stopOpacity: 0.5 }} />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="90" fill="url(#grad)" />
        </svg>
      </div>
    </div>
  );
}
