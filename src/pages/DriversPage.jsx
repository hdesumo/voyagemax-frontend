import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const DriversPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    license_number: "",
  });

  const fetchDrivers = async () => {
    try {
      const res = await axios.get("https://api.voyagemax.net/api/drivers");
      setDrivers(res.data);
    } catch (err) {
      console.error("Erreur chargement drivers", err);
    }
  };

  const handleSave = async () => {
    try {
      if (editingDriver) {
        await axios.put(`https://api.voyagemax.net/api/drivers/${editingDriver.id}`, form);
      } else {
        await axios.post("https://api.voyagemax.net/api/drivers", form);
      }
      fetchDrivers();
      setShowModal(false);
    } catch (err) {
      console.error("Erreur sauvegarde", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce chauffeur ?")) return;
    try {
      await axios.delete(`https://api.voyagemax.net/api/drivers/${id}`);
      fetchDrivers();
    } catch (err) {
      console.error("Erreur suppression", err);
    }
  };

  const handleEdit = (driver) => {
    setEditingDriver(driver);
    setForm(driver);
    setShowModal(true);
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Chauffeurs</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={() => {
            setEditingDriver(null);
            setForm({ fullname: "", phone: "", license_number: "" });
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
            <th className="p-2">Téléphone</th>
            <th className="p-2">Permis</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((d) => (
            <tr key={d.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{d.fullname}</td>
              <td className="p-2">{d.phone}</td>
              <td className="p-2">{d.license_number}</td>
              <td className="p-2 flex gap-2">
                <button onClick={() => handleEdit(d)} className="text-blue-600"><FaEdit /></button>
                <button onClick={() => handleDelete(d.id)} className="text-red-600"><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md shadow">
            <h2 className="text-lg font-bold mb-4">
              {editingDriver ? "Modifier le chauffeur" : "Ajouter un chauffeur"}
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nom complet"
                className="w-full border p-2 rounded"
                value={form.fullname}
                onChange={(e) => setForm({ ...form, fullname: e.target.value })}
              />
              <input
                type="text"
                placeholder="Téléphone"
                className="w-full border p-2 rounded"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <input
                type="text"
                placeholder="Numéro de permis"
                className="w-full border p-2 rounded"
                value={form.license_number}
                onChange={(e) => setForm({ ...form, license_number: e.target.value })}
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => setShowModal(false)}>Annuler</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSave}>
                {editingDriver ? "Mettre à jour" : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriversPage;