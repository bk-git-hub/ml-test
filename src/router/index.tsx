// src/router/index.tsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EntryScreen } from '../features/entry';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<EntryScreen />} />
        {/* 다른 라우트들... */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
