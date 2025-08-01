import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar'; // ✅ ici
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';

import LoginPassenger from './pages/auth/LoginPassenger';
import RegisterPassenger from './pages/auth/RegisterPassenger';
import LoginAdmin from './pages/auth/LoginAdmin';
import LoginSuperAdmin from './pages/auth/LoginSuperAdmin';

import DashboardPassenger from './pages/passenger/DashboardPassenger';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import DashboardSuperAdmin from './pages/superadmin/DashboardSuperAdmin';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ ajout ici */}
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Auth */}
        <Route path="/login/passenger" element={<LoginPassenger />} />
        <Route path="/register/passenger" element={<RegisterPassenger />} />
        <Route path="/login/admin" element={<LoginAdmin />} />
        <Route path="/login/superadmin" element={<LoginSuperAdmin />} />

        {/* Dashboards protégés */}
        <Route
          path="/passenger"
          element={
            <ProtectedRoute allowedRoles={['passenger']}>
              <DashboardPassenger />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superadmin"
          element={
            <ProtectedRoute allowedRoles={['superadmin']}>
              <DashboardSuperAdmin />
            </ProtectedRoute>
          }
        />

        {/* Fallbacks */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
