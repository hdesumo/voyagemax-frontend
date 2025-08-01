// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/Login';
import SuperAdminDashboard from './pages/superadmin/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import DriverDashboard from './pages/driver/Dashboard';
import PassengerDashboard from './pages/passenger/Dashboard';
import AgencyDashboard from './pages/agency/Dashboard';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';
import Loader from './components/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = ['/login'].includes(location.pathname);
  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

function App() {
  const { isLoading, isAuthenticated, role } = useAuth();

  if (isLoading) return <Loader />;

  const redirectToDashboard = () => {
    switch (role) {
      case 'superadmin':
        return <Navigate to="/superadmin" />;
      case 'admin':
        return <Navigate to="/admin" />;
      case 'driver':
        return <Navigate to="/driver" />;
      case 'passenger':
        return <Navigate to="/passenger" />;
      case 'agency':
        return <Navigate to="/agency" />;
      default:
        return <Navigate to="/" />;
    }
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={isAuthenticated ? redirectToDashboard() : <LoginPage />} />

          <Route
            path="/superadmin"
            element={
              <ProtectedRoute requiredRole="superadmin">
                <SuperAdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/driver"
            element={
              <ProtectedRoute requiredRole="driver">
                <DriverDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/passenger"
            element={
              <ProtectedRoute requiredRole="passenger">
                <PassengerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agency"
            element={
              <ProtectedRoute requiredRole="agency">
                <AgencyDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
