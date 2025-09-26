import { User } from '../context/AuthContext';

const USER_KEY = 'auth_user';
const TOKEN_KEY = 'auth_token';
const STORAGE_TYPE_KEY = 'auth_storage_type';

export function setUserToStorage(user: User, token: string, remember: boolean) {
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(USER_KEY, JSON.stringify(user));
  storage.setItem(TOKEN_KEY, token);
  storage.setItem(STORAGE_TYPE_KEY, remember ? 'local' : 'session');
}

export function getUserFromStorage(): { user: User | null; token: string | null } {
  let storage: Storage = localStorage;
  if (localStorage.getItem(STORAGE_TYPE_KEY) === 'session') {
    storage = sessionStorage;
  }
  const user = storage.getItem(USER_KEY);
  const token = storage.getItem(TOKEN_KEY);
  return {
    user: user ? JSON.parse(user) : null,
    token: token || null,
  };
}

export function clearUserFromStorage() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(STORAGE_TYPE_KEY);
  sessionStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(STORAGE_TYPE_KEY);
}
