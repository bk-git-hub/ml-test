// src/router/index.tsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// --- Layouts ---
import MainLayout from '../components/layout/MainLayout';
import AdminLayout from '../components/layout/AdminLayout';

// --- Screen/Page Components ---
import { EntryScreen } from '../features/entry';
import OrderScreen from '../features/order/routes/OrderScreen';
import OrderHistoryPage from '../pages/OrderHistoryPage';
import MenuContent from '../features/order/components/MenuContent';

// --- Admin Pages ---
import AdminDashboard from '../pages/admin/Dashboard';
import AdminOrders from '../pages/admin/Orders';
import AdminCategories from '../pages/admin/Categories';
import AdminMenus from '../pages/admin/Menus';
import StoreEntry from '@/features/order/components/StoreEntry';
import EntryContent from '@/features/entry/components/EntryContent';

import Voice from '@/features/order/components/Voice';
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route without MainLayout */}

        <Route path='/' element={<StoreEntry />} />
        <Route path='/:storeId/:tableNumber' element={<EntryContent />} />
        {/* Routes that WILL use MainLayout */}
        <Route element={<MainLayout />}>
          {/* These routes will render inside MainLayout's <Outlet /> */}
          <Route
            path='/:storeId/:tableNumber/order'
            element={<OrderScreen />}
          />
          <Route
            path='/:storeId/:tableNumber/order/:categoryId'
            element={<MenuContent />}
          />
          <Route
            path='/:storeId/:tableNumber/order-history'
            element={<OrderHistoryPage />}
          />
        </Route>

        {/* Admin Routes */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path='orders' element={<AdminOrders />} />
          <Route path='categories' element={<AdminCategories />} />
          <Route path='menus' element={<AdminMenus />} />
        </Route>

        {/* Other top-level routes can go here */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
