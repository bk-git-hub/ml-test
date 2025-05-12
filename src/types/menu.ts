export interface Menu {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  categoryId: number;
}

export interface Category {
  category_id: number;
  category_name: string;
}
