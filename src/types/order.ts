// src/types/order.ts

export interface Category {
  category_id: number;
  category_name: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: [
    { menuId: string; quantity: number; menuName: string; price: number }
  ];
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}
