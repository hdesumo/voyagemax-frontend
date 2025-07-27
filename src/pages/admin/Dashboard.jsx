import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

function AdminDashboard() {
  const { logout } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Tableau de bord Admin</h1>
      <p>Bienvenue, vous êtes connecté en tant qu'administrateur de société de transport.</p>
      <button onClick={logout}>Se déconnecter</button>
    </div>
  );
}

export default AdminDashboard;
