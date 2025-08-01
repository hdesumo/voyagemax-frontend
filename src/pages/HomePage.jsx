import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [apiStatus, setApiStatus] = useState(null);

  useEffect(() => {
    axios.get('https://voyagemax-backend.yourcustomdomain.com/api/status') // 🔁 à personnaliser
      .then((response) => {
        setApiStatus(response.data);
      })
      .catch((error) => {
        console.error('Erreur API:', error);
        setApiStatus({ status: 'Erreur de connexion à l’API', timestamp: new Date().toISOString() });
      });
  }, []);

  return (
    <div className="homepage">
      <div className="overlay" />
      <div className="welcome-box fade-in">
        <h1>Bienvenue sur <span className="highlight">VoyageMax</span></h1>
        <p>Votre plateforme intelligente de transport.</p>
        <button className="start-button" onClick={() => navigate('/login')}>
          Commencer
        </button>

        {/* Affichage de l'état de l'API */}
        <div style={{ marginTop: '20px', color: '#fff', background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '8px' }}>
          <h3>📡 État du serveur :</h3>
          {apiStatus ? (
            <pre>{JSON.stringify(apiStatus, null, 2)}</pre>
          ) : (
            <p>Vérification de l'API en cours...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
