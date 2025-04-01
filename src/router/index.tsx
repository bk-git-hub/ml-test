// src/router/index.tsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EntryScreen } from '../features/entry';
import OrderScreen from '@/features/order/routes/OrderScreen';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<EntryScreen />} />
        <Route path='/order' element={<OrderScreen />} />{' '}
        {/* OrderScreen 라우트 추가 */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
