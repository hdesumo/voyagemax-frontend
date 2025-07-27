// src/pages/auth/Login.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const dummyUser = { name: 'Admin', role: 'admin' };
    login(dummyUser);
    navigate('/admin');
  };

  return (
    <div>
      <h1>Connexion</h1>
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
}
