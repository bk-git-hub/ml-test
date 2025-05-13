// src/features/order/routes/OrderScreen.tsx

import { useParams } from 'react-router-dom'; // Import useParams
import ChatHistory from '@/features/chat/components/ChatHistory';
import Voice from '@/features/order/components/Voice';

import { useEffect, useState } from 'react';
import { mockMenuItems } from '@/mocks/menuItems';
import { mockCategories } from '@/mocks/categories';
import { useMenuStore } from '@/store/menuStore';
import { Menu } from '@/types/menu';

const OrderScreen = () => {
  useEffect(() => {
    // TODO: Replace with actual API call when ready
    // For now, we'll use mock data
    const initializeStore = async () => {
      try {
        // Simulate API response structure
        const mockResponse = {
          menus: mockMenuItems,
          categories: mockCategories,
        };

        // Group menus by category
        const menusByCategory = mockResponse.menus.reduce((acc, menu) => {
          if (!acc[menu.category_id]) {
            acc[menu.category_id] = [];
          }
          acc[menu.category_id].push({
            id: menu.menu_id,
            name: menu.menu_name,
            price: menu.menu_price,
            categoryId: menu.category_id,
            imageUrl: menu.menu_img_url,
          });
          return acc;
        }, {} as Record<number, Menu[]>);

        // Update store with mock data
        useMenuStore.setState({
          menus: menusByCategory,
          categories: mockResponse.categories.map((cat) => ({
            category_id: cat.category_id,
            category_name: cat.category_name,
          })),
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error initializing store:', error);
        useMenuStore.setState({
          error: 'Failed to load menu data',
          isLoading: false,
        });
      }
    };

    initializeStore();
  }, []);

  return (
    // Remove the outer div with 'flex h-screen' and the NavigationBar import/render
    <div className='p-4 h-full w-full bg-ml-gray'>
      <h1 className='text-2xl font-bold mb-4'>Order Screen</h1>
      <div className='flex h-full w-full'>
        <div className=' h-full overflow-y-scroll flex-1'>
          <ChatHistory />
        </div>
        <Voice />
      </div>
    </div>
  );
};

export default OrderScreen;
