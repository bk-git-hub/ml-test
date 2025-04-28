// src/features/order/contexts/CartContext.tsx
import {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from 'react';
// Import your types
import { Cart, Menu } from '../types';

// --- State Definition ---
// The state managed by the context will conform to the Cart interface
interface CartState extends Cart {
  id?: number;
}

// --- Action Definitions ---
// Define the different actions that can modify the cart state
// Using a discriminated union for type safety
type CartAction =
  | { type: 'ADD_ITEM'; payload: Menu } // Payload is the full menu item to add
  | { type: 'REMOVE_ITEM'; payload: number } // Payload is the menu_id to remove
  | { type: 'UPDATE_QUANTITY'; payload: { menu_id: number; quantity: number } } // Payload has id and new quantity
  | { type: 'CLEAR_CART' }; // No payload needed

// --- Initial State ---
// Define the starting state for the cart context
const initialCartState: CartState = {
  cartItems: [],
};

// --- Reducer Function ---
// This function handles state transitions based on dispatched actions
// IMPORTANT: This is just example logic, you will refine this later!
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newItem = action.payload; // payload는 Menu 객체
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.menu.menu_id === newItem.menu_id
      );

      if (existingItemIndex > -1) {
        // 이미 장바구니에 있는 경우: 수량만 증가
        const updatedCartItems = state.cartItems.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
        return { ...state, cartItems: updatedCartItems };
      } else {
        // 장바구니에 없는 경우: 새 아이템으로 추가 (quantity: 1)
        // CartItemType 구조에 맞춰서 객체 생성 (types/index.ts 참고)
        const newCartItem = {
          menu: newItem, // 전달받은 Menu 객체 사용
          quantity: 1,
        };
        return { ...state, cartItems: [...state.cartItems, newCartItem] };
      }
    }

    case 'REMOVE_ITEM': {
      const menuIdToRemove = action.payload; // payload는 제거할 menu_id
      const filteredCartItems = state.cartItems.filter(
        (item) => item.menu.menu_id !== menuIdToRemove
      );
      return { ...state, cartItems: filteredCartItems };
    }

    case 'UPDATE_QUANTITY': {
      const { menu_id, quantity } = action.payload;

      // 수량이 0 이하인 경우 해당 아이템 제거
      if (quantity <= 0) {
        const filteredCartItems = state.cartItems.filter(
          (item) => item.menu.menu_id !== menu_id
        );
        return { ...state, cartItems: filteredCartItems };
      }

      // 수량이 1 이상인 경우 해당 아이템 수량 업데이트
      const updatedCartItems = state.cartItems.map((item) => {
        if (item.menu.menu_id === menu_id) {
          return { ...item, quantity: quantity }; // 새 수량으로 업데이트
        }
        return item;
      });
      return { ...state, cartItems: updatedCartItems };
    }

    case 'CLEAR_CART': {
      // 장바구니 비우기
      return { ...state, cartItems: [] };
    }

    default:
      // 타입스크립트의 도움으로 이 default 케이스는 이론적으로 도달하지 않아야 합니다.
      // 만약의 경우를 대비해 현재 상태를 반환하거나 에러를 발생시킬 수 있습니다.
      // console.warn(`Unhandled action: ${action}`); // 개발 중 경고 표시
      return state;
  }
};

// --- Context Creation ---
// Create two contexts: one for the state, one for the dispatch function
// Splitting them can prevent unnecessary re-renders in components that only need dispatch
const CartStateContext = createContext<CartState | undefined>(undefined);
const CartDispatchContext = createContext<Dispatch<CartAction> | undefined>(
  undefined
);

// --- Provider Component ---
// This component will wrap parts of your app that need access to the cart
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

// --- Custom Hooks ---
// Create custom hooks for easy access to state and dispatch, including error handling
export const useCartState = (): CartState => {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error('useCartState must be used within a CartProvider');
  }
  return context;
};

export const useCartDispatch = (): Dispatch<CartAction> => {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error('useCartDispatch must be used within a CartProvider');
  }
  return context;
};
