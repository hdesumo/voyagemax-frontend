import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

function DriverDashboard() {
  const { logout } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Tableau de bord Conducteur</h1>
      <p>Bienvenue, vous êtes connecté comme conducteur. Consultez vos trajets assignés.</p>
      <button onClick={logout}>Se déconnecter</button>
    </div>
  );
}

export default DriverDashboard;
