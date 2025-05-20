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
