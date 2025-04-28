// src/features/order/contexts/CartContext.tsx
import React, {
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
  console.log('Reducer Action:', action); // Good for debugging
  switch (action.type) {
    case 'ADD_ITEM':
      // Placeholder logic: Check if item exists, update quantity or add new
      console.log('Reducer: Add Item - Logic TBD');
      // Find existing item... update or add...
      // Example: return { ...state, cartItems: updatedItems };
      return state; // Return current state for now

    case 'REMOVE_ITEM':
      // Placeholder logic: Filter out the item with the matching menu_id
      console.log('Reducer: Remove Item - Logic TBD');
      // Example: return { ...state, cartItems: state.cartItems.filter(...) };
      return state; // Return current state for now

    case 'UPDATE_QUANTITY':
      // Placeholder logic: Find item and update its quantity
      // Handle quantity <= 0 (remove item?)
      console.log('Reducer: Update Quantity - Logic TBD');
      // Example: return { ...state, cartItems: state.cartItems.map(...) };
      return state; // Return current state for now

    case 'CLEAR_CART':
      // Placeholder logic: Reset cartItems to empty array
      console.log('Reducer: Clear Cart - Logic TBD');
      return { ...state, cartItems: [] }; // Example implementation

    default:
      // Ensure all action types are handled, or throw error for unknown actions
      // const exhaustiveCheck: never = action; // Uncomment for exhaustive check
      // throw new Error(`Unhandled action type: ${action.type}`);
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
