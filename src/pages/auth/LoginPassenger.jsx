import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPassenger = () => {
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('https://api.voyagemax.net/api/auth/login/passenger', {
        phone,
        pin,
      });

      localStorage.setItem('token', res.data.token);
      navigate('/passenger');
    } catch (err) {
      setError(err.response?.data?.error || 'Connexion échouée');
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion Passager</h2>
      <form onSubmit={handleSubmit}>
        <label>Téléphone :
          <input type="text" value={phone} onChange={e => setPhone(e.target.value)} required />
        </label>

        <label>Code PIN :
          <input type="password" value={pin} onChange={e => setPin(e.target.value)} required />
        </label>

        <button type="submit">Connexion</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPassenger;
