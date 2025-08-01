import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginSuperAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('https://api.voyagemax.net/api/auth/login/superadmin', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      navigate('/superadmin'); // Redirection vers dashboard SuperAdmin
    } catch (err) {
      setError(err.response?.data?.error || 'Connexion échouée');
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion SuperAdmin</h2>
      <form onSubmit={handleSubmit}>
        <label>Email :
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>

        <label>Mot de passe :
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit">Connexion</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginSuperAdmin;
