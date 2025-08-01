import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [form, setForm] = useState({
    license_plate: "",
    model: "",
    seats_count: "",
    assurance_expiry: "",
    inspection_expiry: "",
  });

  const fetchVehicles = async () => {
    try {
      const response = await axios.get("https://api.voyagemax.net/api/vehicles");
      setVehicles(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des véhicules", error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingVehicle) {
        await axios.put(`https://api.voyagemax.net/api/vehicles/${editingVehicle.id}`, form);
      } else {
        await axios.post("https://api.voyagemax.net/api/vehicles", form);
      }
      setShowModal(false);
      fetchVehicles();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce véhicule ?")) return;
    try {
      await axios.delete(`https://api.voyagemax.net/api/vehicles/${id}`);
      fetchVehicles();
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setForm(vehicle);
    setShowModal(true);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const isExpired = (date) => new Date(date) < new Date();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Liste des véhicules</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={() => {
            setEditingVehicle(null);
            setForm({
              license_plate: "",
              model: "",
              seats_count: "",
              assurance_expiry: "",
              inspection_expiry: "",
            });
            setShowModal(true);
          }}
        >
          <FaPlus /> Ajouter
        </button>
      </div>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Matricule</th>
            <th className="p-2">Modèle</th>
            <th className="p-2">Places</th>
            <th className="p-2">Assurance</th>
            <th className="p-2">Visite Technique</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <tr key={v.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{v.license_plate}</td>
              <td className="p-2">{v.model}</td>
              <td className="p-2">{v.seats_count}</td>
              <td className="p-2">
                <span className={`px-2 py-1 rounded text-white text-sm ${isExpired(v.assurance_expiry) ? "bg-red-500" : "bg-green-500"}`}>
                  {new Date(v.assurance_expiry).toLocaleDateString()}
                </span>
              </td>
              <td className="p-2">
                <span className={`px-2 py-1 rounded text-white text-sm ${isExpired(v.inspection_expiry) ? "bg-red-500" : "bg-green-500"}`}>
                  {new Date(v.inspection_expiry).toLocaleDateString()}
                </span>
              </td>
              <td className="p-2 flex gap-2">
                <button onClick={() => handleEdit(v)} className="text-blue-600"><FaEdit /></button>
                <button onClick={() => handleDelete(v.id)} className="text-red-600"><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md shadow">
            <h2 className="text-lg font-bold mb-4">
              {editingVehicle ? "Modifier le véhicule" : "Ajouter un véhicule"}
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Matricule"
                className="w-full border p-2 rounded"
                value={form.license_plate}
                onChange={(e) => setForm({ ...form, license_plate: e.target.value })}
              />
              <input
                type="text"
                placeholder="Modèle"
                className="w-full border p-2 rounded"
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
              />
              <input
                type="number"
                placeholder="Nombre de places"
                className="w-full border p-2 rounded"
                value={form.seats_count}
                onChange={(e) => setForm({ ...form, seats_count: e.target.value })}
              />
              <label className="block text-sm">Date expiration assurance</label>
              <input
                type="date"
                className="w-full border p-2 rounded"
                value={form.assurance_expiry}
                onChange={(e) => setForm({ ...form, assurance_expiry: e.target.value })}
              />
              <label className="block text-sm">Date expiration visite technique</label>
              <input
                type="date"
                className="w-full border p-2 rounded"
                value={form.inspection_expiry}
                onChange={(e) => setForm({ ...form, inspection_expiry: e.target.value })}
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => setShowModal(false)}>Annuler</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSave}>
                {editingVehicle ? "Mettre à jour" : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehiclesPage;