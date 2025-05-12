import { useNavigate, useParams } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useMenuStore } from '@/store/menuStore';
import { mockCategories } from '@/mocks/categories';
import { mockMenuItems } from '@/mocks/menuItems';
import { useEffect } from 'react';
import { Menu } from '@/types/menu';

const EntryContent = () => {
  const navigate = useNavigate();
  const { storeId, tableNumber } = useParams();
  const { menus, categories, fetchAllMenus } = useMenuStore();

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

  const handleStartOrder = () => {
    navigate(`order`);
  };

  return (
    <div
      className='relative flex flex-col items-center justify-center w-screen h-screen p-4 cursor-pointer bg-[#FFFDF6]'
      onClick={handleStartOrder}
    >
      <div className='absolute top-4 right-4'>
        <LanguageSelector />
      </div>
      <div className='text-[#5C504D] flex flex-col items-center justify-center text-center'>
        <img src='/logoT.png' width={300} height={300} />
        <p className='text-5xl mb-8 animate-pulse'>
          {' '}
          {/* 깜빡이는 효과 적용 */}
          "화면을 터치하여 주문을 시작하세요."
        </p>
      </div>
    </div>
  );
};

export default EntryContent;
