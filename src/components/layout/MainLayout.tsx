// src/components/layout/MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet to render nested routes
import NavigationBar from '@/components/layout/NavigationBar'; // Adjust path if needed
import CartPlaceholder from '@/features/cart/components/CartPlaceholder'; // Adjust path if needed
import ChatHistoryPlaceholder from '@/features/chat/components/ChatHistoryPlaceholder'; // Adjust path if needed

const MainLayout: React.FC = () => {
  return (
    // Outer grid: 3 columns, full screen height
    // Removed explicit grid-rows, height will be determined by h-screen
    <div className='grid grid-cols-[auto_1fr_auto] h-screen overflow-hidden'>
      {/* Navigation Bar (Left Column, Full Height) */}
      {/* Takes full height of the grid row implicitly */}
      <div className='bg-ml-gray overflow-y-auto'>
        <NavigationBar />
      </div>
      {/* Center Area (Middle Column, contains nested grid for Content + Chat) */}
      {/* This div itself takes full height of the grid row implicitly */}
      <div className='grid grid-rows-[1fr_auto] overflow-hidden'>
        {' '}
        {/* Nested Grid */}
        {/* Main Content Area (Top Row of Nested Grid) */}
        {/* Takes remaining space in the nested grid's column */}
        <main className='bg-white overflow-y-auto'>
          {' '}
          {/* Scrolling happens here */}
          {/* Content from nested routes will be rendered here */}
          <Outlet />
        </main>
        {/* Chat History Area (Bottom Row of Nested Grid) */}
        {/* Takes the height of its content */}
        <div className='bg-gray-200'>
          {' '}
          {/* No col-span needed */}
          {/* Replace with actual ChatHistory component later */}
          <ChatHistoryPlaceholder />
        </div>
      </div>{' '}
      {/* End of Nested Grid */}
      {/* Cart Area (Right Column, Full Height) */}
      {/* Takes full height of the grid row implicitly */}
      <div className='bg-gray-100 overflow-y-auto'>
        {/* Replace with actual Cart component later */}
        <CartPlaceholder />
      </div>
    </div> // End of Outer Grid
  );
};

export default MainLayout;
