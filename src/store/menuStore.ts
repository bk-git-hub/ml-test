// src/store/menuStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Menu, Category } from '../types/menu';
import { mapResMenuToMenu } from '../utils/menuMapper'; // 경로 맞춰서 import 하세요

interface MenuState {
  menus: Record<number, Menu[]>;
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchAllMenus: () => Promise<void>;
  getMenusByCategory: (categoryId: number) => Menu[];
  getCategoryById: (categoryId: number) => Category | undefined;
}

export const useMenuStore = create<MenuState>()(
  persist(
    (set, get) => ({
      menus: {},
      categories: [],
      isLoading: false,
      error: null,

      fetchAllMenus: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch('/api/menus/all');
          const data = await response.json();

          // API에서 받은 ResMenu[] → Menu[] 변환
          const menus = mapResMenuToMenu(data.menus);

          // 카테고리별 메뉴 그룹화
          const menusByCategory = menus.reduce(
            (acc: Record<number, Menu[]>, menu: Menu) => {
              if (!acc[menu.categoryId]) {
                acc[menu.categoryId] = [];
              }
              acc[menu.categoryId].push(menu);
              return acc;
            },
            {}
          );

          set({
            menus: menusByCategory,
            categories: data.categories,
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
        return get().menus[categoryId] || [];
      },

      getCategoryById: (categoryId: number) => {
        return get().categories.find(
          (category) => category.category_id === categoryId
        );
      },
    }),
    {
      name: 'menu-storage',
      partialize: (state) => ({
        menus: state.menus,
        categories: state.categories,
      }),
    }
  )
);
