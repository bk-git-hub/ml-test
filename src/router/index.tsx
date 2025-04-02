// src/router/index.tsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EntryScreen } from '../features/entry'; // Assuming correct export
import OrderScreen from '@/features/order/routes/OrderScreen';
import MainLayout from '@/components/layout/MainLayout'; // <-- Import MainLayout

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route without MainLayout */}
        <Route path='/' element={<EntryScreen />} />

        {/* Routes that WILL use MainLayout */}
        <Route element={<MainLayout />}>
          {' '}
          {/* Wrap routes in MainLayout */}
          <Route path='/order' element={<OrderScreen />} />{' '}
          {/* Base order route */}
          <Route path='/order/:categoryId' element={<OrderScreen />} />{' '}
          {/* Dynamic category route */}
          {/* Add any other routes that need the MainLayout here */}
          {/* e.g., <Route path='/order-history' element={<OrderHistoryScreen />} /> */}
        </Route>

        {/* You could add other top-level routes here if needed */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
