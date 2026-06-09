import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (err) {
        console.error('Failed to parse user from localStorage', err);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const saveAuthData = (userData) => {
    setUser(userData);
    setToken(userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token);
  };

  const login = async (email, password) => {
    const data = await api.post('/auth/login', { email, password });
    saveAuthData(data);
    return data;
  };

  const register = async (formData) => {
    const data = await api.post('/auth/register', formData);
    saveAuthData(data);
    return data;
  };

  const updateUser = (updatedUserData) => {
    const newUserData = { ...user, ...updatedUserData, token };
    setUser(newUserData);
    localStorage.setItem('user', JSON.stringify(newUserData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, updateUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
