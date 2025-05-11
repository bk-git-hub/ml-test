import { create } from 'zustand';

interface OrderState {
  storeId: number | null;
  tableNumber: number | null;
  setStoreInfo: (storeId: number, tableNumber: number) => void;
  clearStoreInfo: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  storeId: null,
  tableNumber: null,
  setStoreInfo: (storeId, tableNumber) => set({ storeId, tableNumber }),
  clearStoreInfo: () => set({ storeId: null, tableNumber: null }),
}));
