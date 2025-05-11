// src/components/layout/MainLayout.tsx

import { Outlet } from 'react-router-dom'; // Import Outlet to render nested routes
import NavigationBar from '@/components/layout/NavigationBar'; // Adjust path if needed

import ChatHistoryPlaceholder from '@/features/chat/components/ChatHistoryPlaceholder'; // Adjust path if needed
import Cart from '@/features/order/components/Cart';
import WakeWordDetector from '@/features/order/components/WakeWordDetector';
const MainLayout = () => {
  return (
    // Outer grid: 3 columns, full screen height
    // Removed explicit grid-rows, height will be determined by h-screen
    <div className='flex w-screen h-screen'>
      {/* Navigation Bar (Left Column, Full Height) */}
      {/* Takes full height of the grid row implicitly */}
      <NavigationBar />
      {/* Center Area (Middle Column, contains nested grid for Content + Chat) */}
      {/* This div itself takes full height of the grid row implicitly */}{' '}
      {/* Nested Grid */}
      {/* Main Content Area (Top Row of Nested Grid) */}
      {/* Takes remaining space in the nested grid's column */}
      <div className='flex flex-col flex-1 h-full'>
        <main className='bg-white overflow-y-auto h-full flex-1'>
          {' '}
          {/* Scrolling happens here */}
          {/* Content from nested routes will be rendered here */}
          <Outlet />
        </main>
        {/* Chat History Area (Bottom Row of Nested Grid) */}
        {/* Takes the height of its content */} {/* No col-span needed */}
        {/* Replace with actual ChatHistory component later */}
        <div className='flex grow-0 h-[20%] p-4'>
          <ChatHistoryPlaceholder />
          <WakeWordDetector />
        </div>
      </div>
      {/* End of Nested Grid */}
      {/* Cart Area (Right Column, Full Height) */}
      {/* Takes full height of the grid row implicitly */}
      {/* Replace with actual Cart component later */}
      <Cart />
    </div> // End of Outer Grid
  );
};

export default MainLayout;
