import { NavLink } from 'react-router-dom';
import AdminProfile from './AdminProfile';
export default function AdminNavBar() {
  return (
    <div className='w-[20%] h-screen bg-ml-yellow p-4 flex flex-col rounded-r-3xl'>
      <AdminProfile />
      <nav className='flex flex-col gap-2'>
        <NavLink
          to='/admin'
          end
          className={({ isActive }) =>
            `px-3 py-2 text-sm font-medium rounded-md ${
              isActive
                ? 'bg-white  text-gray-900'
                : 'text-gray-500 hover:text-gray-900'
            }`
          }
        >
          대시보드
        </NavLink>

        <NavLink
          to='/admin/manage'
          end
          className={({ isActive }) =>
            `px-3 py-2 text-sm font-medium rounded-md ${
              isActive
                ? 'bg-white  text-gray-900'
                : 'text-gray-500 hover:text-gray-900'
            }`
          }
        >
          <div className='flex items-center gap-2'>
            <span>상점 정보</span>
          </div>
        </NavLink>
        <NavLink
          to='/admin/orders'
          className={({ isActive }) =>
            `px-3 py-2 text-sm font-medium rounded-md ${
              isActive
                ? 'bg-white text-gray-900'
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
                ? 'bg-white text-gray-900'
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
                ? 'bg-white text-gray-900'
                : 'text-gray-500 hover:text-gray-900'
            }`
          }
        >
          메뉴 관리
        </NavLink>
      </nav>
    </div>
  );
}
