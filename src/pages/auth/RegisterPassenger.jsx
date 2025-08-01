import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPassenger = () => {
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('https://api.voyagemax.net/api/auth/register/passenger', {
        fullname,
        phone,
        pin,
      });

      localStorage.setItem('token', res.data.token);
      navigate('/passenger');
    } catch (err) {
      setError(err.response?.data?.error || 'Échec de l’inscription');
    }
  };

  return (
    <div className="register-container">
      <h2>Inscription Passager</h2>
      <form onSubmit={handleSubmit}>
        <label>Nom complet :
          <input type="text" value={fullname} onChange={e => setFullname(e.target.value)} required />
        </label>

        <label>Téléphone :
          <input type="text" value={phone} onChange={e => setPhone(e.target.value)} required />
        </label>

        <label>Code PIN :
          <input type="password" value={pin} onChange={e => setPin(e.target.value)} required />
        </label>

        <button type="submit">S’inscrire</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default RegisterPassenger;
