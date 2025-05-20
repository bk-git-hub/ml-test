// src/store/menuStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Menu, Category, MenuResponse } from '../types/menu';

interface MenuState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchMenusByCategory: (kioskId: number) => Promise<void>;
  getMenusByCategory: (categoryId: number) => Menu[];
  getCategoryById: (categoryId: number) => Category | undefined;
}

export const useMenuStore = create<MenuState>()(
  persist(
    (set, get) => ({
      categories: [],
      isLoading: false,
      error: null,

      fetchMenusByCategory: async (kioskId: number) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(
            `${
              import.meta.env.VITE_API_URL
            }/api/kiosk/${kioskId}/menu-by-category`
          );
          const data: MenuResponse = await response.json();

          // Filter out the "전체" category
          const filteredCategories = data.filter(
            (category) => category.categoryName !== '전체'
          );

          set({
            categories: filteredCategories,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: '메뉴를 불러오는데 실패했습니다',
            isLoading: false,
          });
          console.error('Failed to fetch menus:', error);
        }
      },

      getMenusByCategory: (categoryId: number) => {
        const category = get().categories.find(
          (category) => category.categoryId === categoryId
        );
        return category?.menus || [];
      },

      getCategoryById: (categoryId: number) => {
        return get().categories.find(
          (category) => category.categoryId === categoryId
        );
      },
    }),
    {
      name: 'menu-storage',
      partialize: (state) => ({
        categories: state.categories,
      }),
    }
  )
);
