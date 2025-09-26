import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserFromStorage, setUserToStorage, clearUserFromStorage } from '../utils/storage';

export interface User {
  id: string;
  name: string;
  email: string;
  userType: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (user: User, token: string, remember: boolean) => void;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const { user, token } = getUserFromStorage();
    if (user && token) {
      setUser(user);
      setToken(token);
    }
  }, []);

  const login = (user: User, token: string, remember: boolean) => {
    setUser(user);
    setToken(token);
    setUserToStorage(user, token, remember);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    clearUserFromStorage();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
