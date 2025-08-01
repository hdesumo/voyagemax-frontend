import React from 'react';

const Unauthorized = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h2>🚫 Accès refusé</h2>
      <p>Vous n’avez pas les droits nécessaires pour accéder à cette page.</p>
      <a href="/">Retour à l'accueil</a>
    </div>
  );
};

export default Unauthorized;
