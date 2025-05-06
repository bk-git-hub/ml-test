import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      {/* Admin Header */}
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            <div className='flex'>
              <div className='flex-shrink-0 flex items-center'>
                <span className='text-xl font-bold text-gray-800'>
                  관리자 페이지
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
        {/* Admin Navigation */}
        <nav className='bg-white shadow mb-6'>
          <div className='px-4 sm:px-6 lg:px-8'>
            <div className='flex space-x-8'>
              <NavLink
                to='/admin'
                end
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-ml-yellow text-gray-900'
                      : 'text-gray-500 hover:text-gray-900'
                  }`
                }
              >
                대시보드
              </NavLink>
              <NavLink
                to='/admin/orders'
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-ml-yellow text-gray-900'
                      : 'text-gray-500 hover:text-gray-900'
                  }`
                }
              >
                주문 관리
              </NavLink>
              <NavLink
                to='/admin/categories'
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-ml-yellow text-gray-900'
                      : 'text-gray-500 hover:text-gray-900'
                  }`
                }
              >
                카테고리 관리
              </NavLink>
              <NavLink
                to='/admin/menus'
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-ml-yellow text-gray-900'
                      : 'text-gray-500 hover:text-gray-900'
                  }`
                }
              >
                메뉴 관리
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className='bg-white shadow rounded-lg'>
          <div className='px-4 py-5 sm:p-6'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
