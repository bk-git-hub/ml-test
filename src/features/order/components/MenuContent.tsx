// src/features/order/components/MenuContent.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Menu } from '../types';
import { mockMenuItems } from '@/mocks/menuItems'; // Import mock data
import MenuItemCard from './MenuItemCard';
// Removed CartDispatch import, handled in MenuItemCard

const MenuContent = () => {
  const { categoryId: categoryIdParam } = useParams<{ categoryId?: string }>();
  const [menuItems, setMenuItems] = useState<Menu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null); // For real API calls

  useEffect(() => {
    setLoading(true);
    // Simulate API call delay
    const timer = setTimeout(() => {
      const currentCategoryId = categoryIdParam
        ? parseInt(categoryIdParam, 10)
        : undefined;

      let filteredItems: Menu[];

      if (currentCategoryId && !isNaN(currentCategoryId)) {
        // Filter by category ID if it exists and is a valid number
        console.log(`Filtering for category ID: ${currentCategoryId}`);
        filteredItems = mockMenuItems.filter(
          (item) => item.category_id === currentCategoryId
        );
      } else {
        // No valid category ID, show all items (or a default category)
        console.log(
          'No valid category ID, showing all items (adjust if needed)'
        );
        filteredItems = mockMenuItems; // Show all for now
      }

      setMenuItems(filteredItems);
      setLoading(false);
    }, 500); // Simulate 500ms loading time

    // Cleanup timer on component unmount or categoryId change
    return () => clearTimeout(timer);
  }, [categoryIdParam]); // Re-run effect when categoryIdParam changes

  if (loading) {
    return <div className='text-center p-10'>Loading menu items...</div>;
  }

  // Optional: Add error handling here for real API calls
  // if (error) {
  //   return <div className="text-center p-10 text-red-500">Error loading items: {error}</div>;
  // }

  if (menuItems.length === 0 && !loading) {
    return (
      <div className='text-center p-10'>선택된 카테고리에 메뉴가 없습니다.</div>
    );
  }

  return (
    // The parent <main> in MainLayout already provides scrolling (overflow-y-auto)
    // If you need padding inside the scrollable area, add it here.
    <div className='p-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {/* Responsive grid: 1 col on smallest screens, up to 4 on large */}
        {menuItems.map((menu) => (
          <MenuItemCard key={menu.menu_id} menu={menu} />
        ))}
      </div>
    </div>
  );
};

export default MenuContent;
