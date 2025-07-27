import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

function SuperAdminDashboard() {
  const { logout } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Tableau de bord Super Admin</h1>
      <p>Bienvenue, vous avez une vue globale sur toutes les sociétés et utilisateurs.</p>
      <button onClick={logout}>Se déconnecter</button>
    </div>
  );
}

export default SuperAdminDashboard;
