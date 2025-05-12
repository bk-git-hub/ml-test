import { useCartStore } from '@/store/cartStore';
import { useMenuStore } from '@/store/menuStore';
import { Menu } from '@/types/menu';

interface ResponseItem {
  menu_id?: number;
  category_id?: number;
  quantity?: number;
  state?: string;
}

export const processIntent = (
  intent: string,
  items: ResponseItem[],
  {
    menus,
    updateQuantity,
    removeItem,
    addItem,
  }: {
    menus: Record<string, Menu[]>;
    updateQuantity: (menuId: number, quantity: number) => void;
    removeItem: (menuId: number) => void;
    addItem: (menu: Menu, quantity?: number) => void;
  }
) => {
  switch (intent) {
    case 'get_category':
      console.log('카테고리 탐색:', items);
      break;
    case 'get_menu':
      console.log('메뉴 탐색:', items);
      break;
    case 'update_cart':
      console.log('장바구니 수정:', items);
      items.forEach((item) => {
        if (
          item.menu_id !== undefined &&
          item.quantity !== undefined &&
          item.state
        ) {
          const menu = Object.values(menus)
            .flat()
            .find((m) => m.id === item.menu_id);

          if (menu) {
            switch (item.state) {
              case 'add':
                addItem({ ...menu }, item.quantity);
                break;
              case 'remove':
                updateQuantity(item.menu_id, item.quantity * -1);
                break;
              case 'removeall':
                removeItem(item.menu_id);
                break;
            }
          }
        }
      });
      break;
    case 'place_order':
      console.log('주문 확정:', items);
      break;
    case 'get_order_history':
      console.log('주문 내역조회:', items);
      break;
    default:
      console.log('알 수 없는 intent:', intent);
  }
};
