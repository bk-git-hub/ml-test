import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Menu, Category } from '../types/menu';

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
          // TODO: 실제 API 엔드포인트로 변경
          const response = await fetch('/api/menus/all');
          const data = await response.json();

          // 카테고리별로 메뉴 그룹화
          const menusByCategory = data.menus.reduce(
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
