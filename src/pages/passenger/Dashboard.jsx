import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

function PassengerDashboard() {
  const { logout } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Tableau de bord Passager</h1>
      <p>Bienvenue cher passager. Réservez et suivez vos voyages facilement.</p>
      <button onClick={logout}>Se déconnecter</button>
    </div>
  );
}

export default PassengerDashboard;
