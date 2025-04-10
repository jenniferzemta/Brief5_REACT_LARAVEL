import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Enregistrement d'un nouvel utilisateur
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Connexion de l'utilisateur
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Déconnexion
export const logout = async () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      await axios.post(`${API_URL}/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Récupération des infos utilisateur
export const getUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.user;
  } catch (error) {
    console.error('Get user error:', error);
    localStorage.removeItem('token');
    return null;
  }
};

// Vérifie si l'utilisateur est authentifié
export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};