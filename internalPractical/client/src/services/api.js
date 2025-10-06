const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export async function register(payload) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload)
  });
  return res;
}

export async function login(payload) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload)
  });
  return res;
}

export async function getMe() {
  const res = await fetch(`${API_BASE}/auth/me`, {
    credentials: 'include'
  });
  return res;
}
