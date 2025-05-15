import { create } from 'zustand';
import { useMenuStore } from './menuStore';

interface NavigationState {
  currentCategoryId: number | null;
  currentMenuId: number | null;
  setCurrentCategory: (categoryId: number | null) => void;
  setCurrentMenu: (menuId: number | null) => void;
  resetNavigation: () => void;
  initializeCategory: () => void;
}

export const useNavigationStore = create<NavigationState>((set, get) => ({
  currentCategoryId: null,
  currentMenuId: null,

  setCurrentCategory: (categoryId) => set({ currentCategoryId: categoryId }),

  setCurrentMenu: (menuId) => set({ currentMenuId: menuId }),

  resetNavigation: () => set({ currentCategoryId: null, currentMenuId: null }),

  initializeCategory: () => {
    const { categories } = useMenuStore.getState();
    if (categories.length > 0 && get().currentCategoryId === null) {
      set({ currentCategoryId: categories[0].category_id });
    }
  },
}));
