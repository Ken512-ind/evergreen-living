import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const authService = {
  // Register user
  registerUser: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Registration failed' };
    }
  },

  // Login user
  loginUser: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Login failed' };
    }
  },

  // Logout user
  logoutUser: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Get token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Check if authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Check if admin
  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user?.role === 'admin';
  },
};

export default authService;

// Named exports untuk compatibility
export const registerUser = authService.registerUser;
export const loginUser = authService.loginUser;
export const logoutUser = authService.logoutUser;
export const getCurrentUser = authService.getCurrentUser;
export const getToken = authService.getToken;
export const isAuthenticated = authService.isAuthenticated;
export const isAdmin = authService.isAdmin;