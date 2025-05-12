// src/features/order/components/MenuContent.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Menu } from '@/types/menu';

import MenuItemCard from './MenuItemCard';
import { useMenuStore } from '@/store/menuStore';

const MenuContent = () => {
  const { categoryId: categoryIdParam } = useParams<{ categoryId?: string }>();
  const [menuItems, setMenuItems] = useState<Menu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { menus } = useMenuStore();

  useEffect(() => {
    setLoading(true);
    const currentCategoryId = categoryIdParam
      ? parseInt(categoryIdParam, 10)
      : undefined;

    let filteredItems: Menu[] = [];

    if (currentCategoryId && !isNaN(currentCategoryId)) {
      // Get menus for the specific category and transform to order Menu type
      const categoryMenus = menus[currentCategoryId] || [];
      filteredItems = categoryMenus.map((menu) => ({
        id: menu.id,
        name: menu.name,
        price: menu.price,
        categoryId: menu.categoryId,
        imageUrl: menu.imageUrl || '',
      }));
    } else {
      // No valid category ID, show all items by flattening all categories
      filteredItems = Object.values(menus)
        .flat()
        .map((menu) => ({
          id: menu.id,
          name: menu.name,
          price: menu.price,
          categoryId: menu.categoryId,
          imageUrl: menu.imageUrl || '',
        }));
    }

    setMenuItems(filteredItems);
    setLoading(false);
  }, [categoryIdParam, menus]); // Re-run effect when categoryIdParam or menus change

  if (loading) {
    return <div className='text-center p-10'>Loading menu items...</div>;
  }

  if (menuItems.length === 0 && !loading) {
    return (
      <div className='text-center p-10'>선택된 카테고리에 메뉴가 없습니다.</div>
    );
  }

  return (
    <div className='p-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {menuItems.map((menu) => (
          <MenuItemCard key={menu.id} menu={menu} />
        ))}
      </div>
    </div>
  );
};

export default MenuContent;
