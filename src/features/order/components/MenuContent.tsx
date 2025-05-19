    import { useEffect } from 'react';
import { Menu } from '@/types/menu';
import MenuItemCard from './MenuItemCard';
import { useNavigationStore } from '@/store/navigationStore';
import { useMenuStore } from '@/store/menuStore';

const MenuContent = () => {
  const { currentCategoryId, currentMenuId } = useNavigationStore();
  const { menus, fetchAllMenus } = useMenuStore();

  useEffect(() => {
    fetchAllMenus();
  }, [fetchAllMenus]);

  const allMenuItems = Object.values(menus).flat();

  const filteredItems = allMenuItems.reduce<Menu[]>((items, item) => {
    if (currentCategoryId !== null && item.categoryId !== currentCategoryId) {
      return items;
    }
    if (currentMenuId !== null && item.id === currentMenuId) {
      return [item, ...items];
    }
    return [...items, item];
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {filteredItems.map((menu) => (
        <MenuItemCard
          key={menu.id}
          menu={menu}
          isSearched={menu.id === currentMenuId}
        />
      ))}
    </div>
  );
};

export default MenuContent;
