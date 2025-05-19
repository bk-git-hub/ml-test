export interface Menu {
  id: number;
  name: string;
  name_en: string;
  price: number;
  imageUrl: string;
  categoryId: number;
}

// ✅ Category 타입 정의
export interface Category {
  category_id: number;
  name: string;
  name_en: string;
}

// ✅ ResMenu 타입 정의
export interface ResMenu {
  menu_id: number;
  menu_name: string;
  menu_name_en: string;
  menu_price: number;
  menu_img_url: string;
  category_id: number;
}
