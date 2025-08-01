import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TripsPage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrips = async () => {
    try {
      const response = await axios.get('https://api.voyagemax.net/api/trips');
      setTrips(response.data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des trajets.');
    } finally {
      setLoading(false);
    }
  };

  const deleteTrip = async (id) => {
    if (!window.confirm("Confirmer la suppression du trajet ?")) return;
    try {
      await axios.delete(`https://api.voyagemax.net/api/trips/${id}`);
      setTrips(trips.filter(t => t.id !== id));
    } catch (err) {
      alert("Erreur lors de la suppression.");
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Liste des Trajets</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th>Départ</th>
            <th>Arrivée</th>
            <th>Véhicule</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trips.map(trip => (
            <tr key={trip.id} className="border-t">
              <td>{trip.departure}</td>
              <td>{trip.arrival}</td>
              <td>{trip.vehicleId}</td>
              <td>{new Date(trip.date).toLocaleDateString()}</td>
              <td>
                <button onClick={() => deleteTrip(trip.id)} className="bg-red-500 text-white px-2 py-1 rounded">
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
