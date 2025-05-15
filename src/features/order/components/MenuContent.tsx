// src/features/order/components/MenuContent.tsx
import { Menu } from '@/types/menu';
import MenuItemCard from './MenuItemCard';
import { useNavigationStore } from '@/store/navigationStore';
import { useMenuStore } from '@/store/menuStore';

const MenuContent = () => {
  const { currentCategoryId, currentMenuId } = useNavigationStore();
  const { menus } = useMenuStore();

  // 모든 메뉴를 하나의 배열로 변환
  const allMenuItems = Object.values(menus).flat();

  // 필터링된 메뉴 아이템 계산
  const filteredItems = allMenuItems.reduce<Menu[]>((items, item) => {
    // 카테고리 필터링
    if (currentCategoryId !== null && item.categoryId !== currentCategoryId) {
      return items;
    }

    // 검색된 메뉴인 경우 맨 앞에 추가
    if (currentMenuId !== null && item.id === currentMenuId) {
      return [item, ...items];
    }

    // 나머지 메뉴는 순서대로 추가
    return [...items, item];
  }, []);

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3  gap-4 p-4'>
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
