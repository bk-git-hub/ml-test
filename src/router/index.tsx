// src/router/index.tsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useNavigationStore } from '@/store/navigationStore';

// --- Layouts ---
import MainLayout from '../components/layout/MainLayout';

// --- Screen/Page Components ---

import OrderHistoryPage from '../pages/OrderHistoryPage';
import MenuContent from '../features/order/components/MenuContent';

import StoreEntry from '@/features/order/components/StoreEntry';

import { useEffect } from 'react';
import { mockMenuItems } from '@/mocks/menuItems.ts';
import { mockCategories } from '@/mocks/categories.ts';
import { Menu } from '@/types/menu.ts';
import { useMenuStore } from '@/store/menuStore.ts';

const OrderContent = () => {
  const { currentView } = useNavigationStore();
  return currentView === 'menu' ? <MenuContent /> : <OrderHistoryPage />;
};

const AppRouter = () => {
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
            name_en: menu.menu_name_en, // ✅ 영어 이름 저장
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
            category_name_en: cat.category_name_en, // ✅ 영어 카테고리 저장
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
    <BrowserRouter>
      <Routes>
        {/* Route without MainLayout */}

        <Route path='/' element={<StoreEntry />} />

        {/* Routes that WILL use MainLayout */}
        <Route element={<MainLayout />}>
          {/* These routes will render inside MainLayout's <Outlet /> */}

          <Route
            path='/:storeId/:tableNumber/order'
            element={<OrderContent />}
          />
        </Route>

        {/* Admin Routes */}

        {/* Other top-level routes can go here */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
