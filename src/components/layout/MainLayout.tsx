// src/components/layout/MainLayout.tsx (Create this file/directory if needed)
import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet to render nested routes
import NavigationBar from '@/components/layout/NavigationBar'; // Adjust path if needed
// Adjust path if needed
import ChatHistoryPlaceholder from '@/features/chat/components/ChatHistoryPlaceholder';
import CartPlaceholder from '@/features/cart/components/CartPlaceholder';

const MainLayout: React.FC = () => {
  return (
    <div className='grid grid-cols-[auto_1fr_auto] grid-rows-[1fr_auto] h-screen overflow-hidden'>
      {/* Navigation Bar (Left Column, Top Row) */}
      <div className='row-start-1 col-start-1 bg-ml-gray overflow-y-auto'>
        {' '}
        {/* Added bg color and overflow */}
        <NavigationBar />
      </div>

      {/* Main Content Area (Center Column, Top Row) */}
      <main className='row-start-1 col-start-2 bg-white overflow-y-auto'>
        {' '}
        {/* Added bg color and overflow */}
        {/* Content from nested routes will be rendered here */}
        <Outlet />
      </main>

      {/* Cart Area (Right Column, Top Row) */}
      <div className='row-start-1 col-start-3 bg-gray-100 overflow-y-auto'>
        {' '}
        {/* Added bg color and overflow */}
        {/* Replace with actual Cart component later */}
        <CartPlaceholder />
      </div>

      {/* Chat History Area (Spans All Columns, Bottom Row) */}
      <div className='row-start-2 col-start-1 col-span-3 bg-gray-200'>
        {' '}
        {/* Added bg color */}
        {/* Replace with actual ChatHistory component later */}
        <ChatHistoryPlaceholder />
      </div>
    </div>
  );
};

export default MainLayout;
