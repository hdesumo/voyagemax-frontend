import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => (
  <main style={{ padding: '1rem' }}>
    {/* Plus tard : ajouter Sidebar, Header interne, etc. */}
    <Outlet />
  </main>
);

export default DashboardLayout;
