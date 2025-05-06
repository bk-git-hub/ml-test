export interface Menu {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  categoryId: number;
  isAvailable: boolean;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}
