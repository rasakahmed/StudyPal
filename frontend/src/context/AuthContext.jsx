import { createContext, useContext, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('studypal_user') || 'null'));
  const [token, setToken] = useState(() => localStorage.getItem('studypal_token'));
  const [loading, setLoading] = useState(false);

  const persist = (data) => {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('studypal_user', JSON.stringify(data.user));
    localStorage.setItem('studypal_token', data.token);
  };

  const login = async (payload) => {
    setLoading(true);
    try {
      const data = await authService.login(payload);
      persist(data);
      toast.success('Welcome back');
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const data = await authService.register(payload);
      persist(data);
      toast.success('Account created');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('studypal_user');
    localStorage.removeItem('studypal_token');
  };

  const value = useMemo(() => ({ user, token, loading, login, register, logout, isAuthenticated: Boolean(token) }), [user, token, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
