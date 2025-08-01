import axios from 'axios';

// Utilise le domaine défini dans le fichier .env ou celui par défaut
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://voyage-backend-production.up.railway.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

