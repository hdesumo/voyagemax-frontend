import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <div className="overlay" />
      <div className="welcome-box fade-in">
        <h1>Bienvenue sur <span className="highlight">VoyageMax</span></h1>
        <p>Votre plateforme intelligente de transport.</p>
        <button className="start-button" onClick={() => navigate('/login')}>
          Commencer
        </button>
      </div>
    </div>
  );
};

export default HomePage;
