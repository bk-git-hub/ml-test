// src/utils/menuMapper.ts

import { ResMenu } from '@/types/menu';
import { Menu } from '@/types/menu';

// ResMenu[] → Menu[] 변환 함수
export const mapResMenuToMenu = (resMenus: ResMenu[]): Menu[] => {
  return resMenus.map((item) => ({
    id: item.menu_id,
    name: item.menu_name,
    name_en: item.menu_name_en,
    price: item.menu_price,
    imageUrl: item.menu_img_url,
    categoryId: item.category_id,
  }));
};
