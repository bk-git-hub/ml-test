import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import AdminNavBar from '../AdminNavBar';
const AdminLayout: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-100 flex'>
      {/* Admin Header */}
      <AdminNavBar />

      {/* Admin Navigation */}

      {/* Main Content */}
      <main className='bg-white shadow rounded-lg flex-1'>
        <div className='px-4 py-5 sm:p-6'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
