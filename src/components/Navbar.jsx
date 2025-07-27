import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { logout, role } = useAuth();

  return (
    <nav>
      <Link to="/">Accueil</Link>
      {role && <button onClick={logout}>Déconnexion</button>}
    </nav>
  );
};

export default Navbar;
