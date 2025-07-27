import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

function AgencyDashboard() {
  const { logout } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Tableau de bord Agence</h1>
      <p>Bienvenue à l'agence, vous pouvez gérer vos trajets et véhicules locaux.</p>
      <button onClick={logout}>Se déconnecter</button>
    </div>
  );
}

export default AgencyDashboard;
