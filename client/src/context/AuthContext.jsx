import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

// 1. Creamos la instancia de axios fuera para que sea global
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 2. Este useEffect se encarga de "pegar" el token a la API apenas carga o cambia
  useEffect(() => {
    if (token) {
      // Importante: El nombre debe ser EXACTAMENTE 'x-auth-token' como en tu backend
      api.defaults.headers.common['x-auth-token'] = token;
      
      const savedUser = JSON.parse(localStorage.getItem('user'));
      if (savedUser) setUser(savedUser);
    } else {
      delete api.defaults.headers.common['x-auth-token'];
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    
    // Guardamos en LocalStorage
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    
    // Seteamos el token en la API inmediatamente
    api.defaults.headers.common['x-auth-token'] = res.data.token;
    
    // Actualizamos el estado
    setToken(res.data.token);
    setUser(res.data.user);
    
    navigate('/');
  };

  const register = async (nombre, email, password) => {
    const res = await api.post('/auth/register', { nombre, email, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    
    api.defaults.headers.common['x-auth-token'] = res.data.token;
    
    setToken(res.data.token);
    setUser(res.data.user);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['x-auth-token'];
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading, api }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);