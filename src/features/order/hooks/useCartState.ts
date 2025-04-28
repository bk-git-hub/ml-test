// src/features/order/hooks/useCartState.ts

import { useContext } from 'react';
// CartContext 파일에서 필요한 Context 객체와 타입을 import 합니다.
import { CartStateContext, CartState } from '../contexts/CartContext'; // CartState 타입도 가져옵니다.

// useCartState 훅 정의 및 export
export const useCartState = (): CartState => {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error('useCartState must be used within a CartProvider');
  }
  return context;
};
