import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('https://api.voyagemax.net/api/bookings');
      setBookings(response.data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des réservations.');
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Confirmer la suppression de la réservation ?")) return;
    try {
      await axios.delete(`https://api.voyagemax.net/api/bookings/${id}`);
      setBookings(bookings.filter(b => b.id !== id));
    } catch (err) {
      alert("Erreur lors de la suppression.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Réservations</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th>Passager</th>
            <th>Trajet</th>
            <th>Statut</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id} className="border-t">
              <td>{booking.passengerId}</td>
              <td>{booking.tripId}</td>
              <td>{booking.status}</td>
              <td>{new Date(booking.createdAt).toLocaleString()}</td>
              <td>
                <button onClick={() => deleteBooking(booking.id)} className="bg-red-500 text-white px-2 py-1 rounded">
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
