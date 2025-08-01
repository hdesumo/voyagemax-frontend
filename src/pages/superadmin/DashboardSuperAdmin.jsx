import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardSuperAdmin = () => {
  const [superAdmin, setSuperAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('https://api.voyagemax.net/api/auth/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (res.data.role === 'superadmin') {
          setSuperAdmin(res.data.user);
        } else {
          window.location.href = '/login/superadmin';
        }
      } catch (err) {
        console.error('Erreur de chargement :', err);
        window.location.href = '/login/superadmin';
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Bienvenue, SuperAdmin</h1>
      <p><strong>Nom :</strong> {superAdmin.fullname}</p>
      <p><strong>Email :</strong> {superAdmin.email}</p>
      <p><strong>ID :</strong> {superAdmin.id}</p>
    </div>
  );
};

export default DashboardSuperAdmin;
