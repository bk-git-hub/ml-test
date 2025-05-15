import { create } from 'zustand';

interface NavigationState {
  currentCategoryId: number | null;
  currentMenuId: number | null;
  setCurrentCategory: (categoryId: number | null) => void;
  setCurrentMenu: (menuId: number | null) => void;
  resetNavigation: () => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentCategoryId: null,
  currentMenuId: null,
  setCurrentCategory: (categoryId) => set({ currentCategoryId: categoryId }),
  setCurrentMenu: (menuId) => set({ currentMenuId: menuId }),
  resetNavigation: () => set({ currentCategoryId: null, currentMenuId: null }),
}));
