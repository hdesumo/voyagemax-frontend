import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PassengersPage() {
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPassengers = async () => {
    try {
      const response = await axios.get('https://api.voyagemax.net/api/passengers');
      setPassengers(response.data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des passagers.');
    } finally {
      setLoading(false);
    }
  };

  const deletePassenger = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce passager ?")) return;
    try {
      await axios.delete(`https://api.voyagemax.net/api/passengers/${id}`);
      setPassengers(passengers.filter(p => p.id !== id));
    } catch (err) {
      alert("Erreur lors de la suppression.");
    }
  };

  useEffect(() => {
    fetchPassengers();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Liste des Passagers</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {passengers.map(passenger => (
            <tr key={passenger.id} className="border-t">
              <td>{passenger.fullname}</td>
              <td>{passenger.email}</td>
              <td>{passenger.phone}</td>
              <td>
                <button onClick={() => deletePassenger(passenger.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
