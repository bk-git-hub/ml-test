// src/features/order/hooks/useCartDispatch.ts

import { useContext } from 'react';
import { Dispatch } from 'react'; // Dispatch 타입을 가져옵니다.
// CartContext 파일에서 필요한 Context 객체와 타입을 import 합니다.
import { CartDispatchContext, CartAction } from '../contexts/CartContext'; // CartAction 타입도 가져옵니다.

// useCartDispatch 훅 정의 및 export
export const useCartDispatch = (): Dispatch<CartAction> => {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error('useCartDispatch must be used within a CartProvider');
  }
  return context;
};
