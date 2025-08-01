import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardAdmin = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('https://api.voyagemax.net/api/auth/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (res.data.role === 'admin') {
          setAdmin(res.data.user);
        } else {
          window.location.href = '/unauthorized';
        }
      } catch (err) {
        console.error('Erreur de chargement :', err);
        window.location.href = '/login/admin';
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Bienvenue, Admin</h1>
      <p><strong>Nom :</strong> {admin.fullname}</p>
      <p><strong>Email :</strong> {admin.email}</p>
      <p><strong>ID :</strong> {admin.id}</p>
    </div>
  );
};

export default DashboardAdmin;
