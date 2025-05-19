import { Menu } from '@/types/menu';
import MenuItemCard from './MenuItemCard';
import { useNavigationStore } from '@/store/navigationStore';
import { useMenuStore } from '@/store/menuStore';
import { useLanguageStore } from '@/store/languageStore'; // 다국어 상태 가져오기

const MenuContent = () => {
  const { currentCategoryId, currentMenuId } = useNavigationStore();
  const { menus } = useMenuStore();
  const { language } = useLanguageStore();

  // 모든 메뉴를 배열로 평탄화
  const allMenuItems = Object.values(menus).flat();

  // 필터링 & 우선순위 메뉴 배열 생성
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
      {filteredItems.map((menu) => {
        const displayName = language === 'en' && menu.name_en ? menu.name_en : menu.name;

        return (
          <MenuItemCard
            key={menu.id}
            menu={menu}
            displayName={displayName}
            isSearched={menu.id === currentMenuId}
          />
        );
      })}
    </div>
  );
};

export default MenuContent;
