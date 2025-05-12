export interface Menu {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  categoryId: number;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}
