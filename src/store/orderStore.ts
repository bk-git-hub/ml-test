import { create } from 'zustand';
import { Order } from '../types/order';

interface OrderState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  isLoading: false,
  error: null,
  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: API 연동
      const mockOrders: Order[] = [
        {
          id: '1',
          orderNumber: 'ORD-001',
          items: [
            { menuId: '1', quantity: 2, menuName: '아메리카노', price: 4500 },
            { menuId: '2', quantity: 1, menuName: '카페라떼', price: 5000 },
          ],
          totalAmount: 14000,
          status: 'completed',
          createdAt: '2024-03-20T10:00:00Z',
          updatedAt: '2024-03-20T10:05:00Z',
        },
        {
          id: '2',
          orderNumber: 'ORD-002',
          items: [
            { menuId: '3', quantity: 1, menuName: '바닐라라떼', price: 5500 },
          ],
          totalAmount: 5500,
          status: 'pending',
          createdAt: '2024-03-20T11:00:00Z',
          updatedAt: '2024-03-20T11:00:00Z',
        },
      ];
      set({ orders: mockOrders });
    } catch (error) {
      set({ error: '주문 내역을 불러오는데 실패했습니다.' });
    } finally {
      set({ isLoading: false });
    }
  },
  addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      ),
    })),
}));
