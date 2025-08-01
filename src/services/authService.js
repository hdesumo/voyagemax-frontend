// src/services/authService.js
import axios from 'axios';
import API_BASE_URL from '../config/api';

export const loginSuperAdmin = async (email, password) => {
  const res = await axios.post(`${API_BASE_URL}/auth/superadmin/login`, {
    email,
    password
  });
  return res.data;
};

