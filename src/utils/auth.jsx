// src/utils/auth.js

export const getToken = () => {
  return localStorage.getItem('token');
};

export const decodeToken = () => {
  const token = getToken();
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const getUserRole = () => {
  const payload = decodeToken();
  return payload?.role || null;
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
};

export const isLoggedIn = () => {
  return !!getToken();
};
