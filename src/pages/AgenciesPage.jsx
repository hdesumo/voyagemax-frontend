import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const AgenciesPage = () => {
  const [agencies, setAgencies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAgency, setEditingAgency] = useState(null);
  const [form, setForm] = useState({
    name: "",
    city: "",
    address: ""
  });

  const fetchAgencies = async () => {
    try {
      const res = await axios.get("https://api.voyagemax.net/api/agencies");
      setAgencies(res.data);
    } catch (err) {
      console.error("Erreur chargement agences", err);
    }
  };

  const handleSave = async () => {
    try {
      if (editingAgency) {
        await axios.put(`https://api.voyagemax.net/api/agencies/${editingAgency.id}`, form);
      } else {
        await axios.post("https://api.voyagemax.net/api/agencies", form);
      }
      fetchAgencies();
      setShowModal(false);
    } catch (err) {
      console.error("Erreur sauvegarde", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette agence ?")) return;
    try {
      await axios.delete(`https://api.voyagemax.net/api/agencies/${id}`);
      fetchAgencies();
    } catch (err) {
      console.error("Erreur suppression", err);
    }
  };

  const handleEdit = (agency) => {
    setEditingAgency(agency);
    setForm(agency);
    setShowModal(true);
  };

  useEffect(() => {
    fetchAgencies();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Agences</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={() => {
            setEditingAgency(null);
            setForm({ name: "", city: "", address: "" });
            setShowModal(true);
          }}
        >
          <FaPlus /> Ajouter
        </button>
      </div>

      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Nom</th>
            <th className="p-2">Ville</th>
            <th className="p-2">Adresse</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {agencies.map((a) => (
            <tr key={a.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{a.name}</td>
              <td className="p-2">{a.city}</td>
              <td className="p-2">{a.address}</td>
              <td className="p-2 flex gap-2">
                <button onClick={() => handleEdit(a)} className="text-blue-600"><FaEdit /></button>
                <button onClick={() => handleDelete(a.id)} className="text-red-600"><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md shadow">
            <h2 className="text-lg font-bold mb-4">
              {editingAgency ? "Modifier l'agence" : "Ajouter une agence"}
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nom"
                className="w-full border p-2 rounded"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Ville"
                className="w-full border p-2 rounded"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
              <input
                type="text"
                placeholder="Adresse"
                className="w-full border p-2 rounded"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => setShowModal(false)}>Annuler</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSave}>
                {editingAgency ? "Mettre à jour" : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgenciesPage;