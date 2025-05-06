// src/router/index.tsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// --- Layouts ---
import MainLayout from '@/components/layout/MainLayout'; // Adjust path if needed

// --- Screen/Page Components ---
import { EntryScreen } from '../features/entry'; // Assuming correct export, adjust path if needed
import OrderScreen from '@/features/order/routes/OrderScreen'; // Adjust path if needed
import OrderHistoryPage from '@/pages/OrderHistoryPage';
import MenuContent from '@/features/order/components/MenuContent';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route without MainLayout */}
        <Route path='/' element={<EntryScreen />} />

        {/* Routes that WILL use MainLayout */}
        <Route element={<MainLayout />}>
          {/* These routes will render inside MainLayout's <Outlet /> */}
          <Route path='/order' element={<OrderScreen />} />
          <Route path='/order/:categoryId' element={<MenuContent />} />
          <Route path='/order-history' element={<OrderHistoryPage />} />
        </Route>

        {/* Other top-level routes can go here */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
