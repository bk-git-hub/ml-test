// src/features/order/routes/OrderScreen.tsx

import { useParams } from 'react-router-dom'; // Import useParams
import ChatHistory from '@/features/chat/components/ChatHistory';
import VoiceTester from '@/features/order/components/VoiceTester';
const OrderScreen = () => {
  // Get the categoryId from the URL, if it exists

  // TODO:
  // 1. Use the categoryId to fetch or filter menu items for that category.
  // 2. Display the menu items.

  return (
    // Remove the outer div with 'flex h-screen' and the NavigationBar import/render
    <div className='p-4 h-full w-full  '>
      <h1 className='text-2xl font-bold mb-4'>Order Screen</h1>
      <div className='flex h-full w-full'>
        <div className=' h-full overflow-y-scroll flex-1'>
          <ChatHistory />
        </div>
        <VoiceTester />
      </div>
    </div>
  );
};

export default OrderScreen;
