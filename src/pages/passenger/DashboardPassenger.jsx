import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardPassenger = () => {
  const [passenger, setPassenger] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('https://api.voyagemax.net/api/auth/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (res.data.role === 'passenger') {
          setPassenger(res.data.user);
        } else {
          window.location.href = '/unauthorized';
        }
      } catch (err) {
        console.error('Erreur de chargement :', err);
        window.location.href = '/login/passenger';
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Bienvenue, Passager</h1>
      <p><strong>Nom :</strong> {passenger.fullname}</p>
      <p><strong>Téléphone :</strong> {passenger.phone}</p>
      <p><strong>ID :</strong> {passenger.id}</p>
    </div>
  );
};

export default DashboardPassenger;
