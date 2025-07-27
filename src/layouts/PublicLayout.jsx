import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
  </>
);

export default PublicLayout;
