import { useState } from 'react';
import axios from 'axios';

function LoginPassenger() {
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('https://api.voyagemax.net/api/auth/login/passenger', {
        phone,
        pin,
      });

      localStorage.setItem('token', res.data.token);
      window.location.href = '/passenger/dashboard';
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Connexion Passager</h2>
      <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Téléphone" required />
      <input value={pin} onChange={e => setPin(e.target.value)} type="password" placeholder="Code PIN" required />
      <button type="submit">Connexion</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default LoginPassenger;
