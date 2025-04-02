// src/router/index.tsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// --- Context Provider ---
import { CartProvider } from '@/features/order/contexts/CartContext'; // Adjust path if needed

// --- Layouts ---
import MainLayout from '@/components/layout/MainLayout'; // Adjust path if needed

// --- Screen/Page Components ---
import { EntryScreen } from '../features/entry'; // Assuming correct export, adjust path if needed
import OrderScreen from '@/features/order/routes/OrderScreen'; // Adjust path if needed
// import OrderHistoryScreen from '@/features/order-history/routes/OrderHistoryScreen'; // Example for future

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route without MainLayout */}
        <Route path='/' element={<EntryScreen />} />

        {/* Routes that WILL use MainLayout */}
        {/* Wrap the MainLayout element with the CartProvider */}
        <Route
          element={
            <CartProvider>
              <MainLayout />
            </CartProvider>
          }
        >
          {/* These routes will render inside MainLayout's <Outlet /> */}
          {/* and will have access to the CartContext */}
          <Route path='/order' element={<OrderScreen />} />
          <Route path='/order/:categoryId' element={<OrderScreen />} />
          {/* e.g., <Route path='/order-history' element={<OrderHistoryScreen />} /> */}
        </Route>

        {/* Other top-level routes can go here */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
