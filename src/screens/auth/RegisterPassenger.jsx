import { useState } from 'react';
import axios from 'axios';

function RegisterPassenger() {
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('https://api.voyagemax.net/api/auth/register/passenger', {
        fullname,
        phone,
        pin,
      });

      localStorage.setItem('token', res.data.token);
      window.location.href = '/passenger/dashboard';
    } catch (err) {
      setError(err.response?.data?.error || 'Échec de l’inscription');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Inscription Passager</h2>
      <input value={fullname} onChange={e => setFullname(e.target.value)} placeholder="Nom complet" required />
      <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Téléphone" required />
      <input value={pin} onChange={e => setPin(e.target.value)} type="password" placeholder="Code PIN" required />
      <button type="submit">Créer un compte</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default RegisterPassenger;
