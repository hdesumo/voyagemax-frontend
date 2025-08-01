import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, getUserRole, logout } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
      <h2 style={{ display: 'inline-block', marginRight: '2rem' }}>🚍 VoyageMax</h2>

      {isLoggedIn() ? (
        <>
          <span style={{ marginRight: '1rem' }}>
            Connecté en tant que : <strong>{getUserRole()}</strong>
          </span>
          <button onClick={handleLogout}>Déconnexion</button>
        </>
      ) : (
        <button onClick={() => navigate('/login/passenger')}>Connexion</button>
      )}
    </nav>
  );
};

export default Navbar;
