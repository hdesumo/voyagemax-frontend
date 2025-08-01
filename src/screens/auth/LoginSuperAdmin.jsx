import { useState } from 'react';
import axios from 'axios';

function LoginSuperAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('https://api.voyagemax.net/api/auth/login/superadmin', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      window.location.href = '/superadmin/dashboard';
    } catch (err) {
      setError(err.response?.data?.error || 'Échec de connexion');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Connexion SuperAdmin</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Mot de passe" required />
      <button type="submit">Connexion</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default LoginSuperAdmin;
