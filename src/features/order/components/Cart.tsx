// src/features/order/components/CartComponent.tsx

import { useCartStore } from '@/store/cartStore';
import CartItem from './CartItem';
import { CartItemType } from '../types';
import { useState } from 'react';

const Cart = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const clearCart = useCartStore((state) => state.clearCart);
  const [showModal, setShowModal] = useState(false);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total: number, item: CartItemType) =>
      total + item.menu.price * item.quantity,
    0
  );

  // Handler for the "주문하기" button
  const handlePlaceOrder = () => {
    console.log('주문하기 button clicked!');
    console.log('Cart Items:', cartItems);
    console.log('Total Price:', totalPrice);
    setShowModal(true);
  };

  const handleConfirmOrder = () => {
    // TODO: Implement order placement logic
    // - Send order details (cartItems, totalPrice) to the server
    // - Handle response (success/error)
    clearCart();
    setShowModal(false);
  };

  return (
    <>
      <aside className='w-60 bg-white border-l border-gray-200 flex flex-col h-full shrink-0'>
        {' '}
        {/* Adjusted width */}
        {/* Header */}
        <div className='p-4 border-b border-gray-200 flex-shrink-0'>
          <h2 className='text-xl font-bold text-center'>장바구니</h2>
          {/* The horizontal line is implicitly the border-b above/below */}
        </div>
        {/* Cart Items List - Scrollable */}
        <div className='flex-1 overflow-y-auto p-4'>
          {cartItems.length === 0 ? (
            <p className='text-center text-gray-500 mt-10'>
              장바구니가 비어있습니다.
            </p>
          ) : (
            <div>
              {cartItems.map((item) => (
                // Use menu_id for key if options are not considered,
                // otherwise a unique cartItemId generated upon adding is better
                <CartItem key={item.menu.id} item={item} />
              ))}
            </div>
          )}
        </div>
        {/* Footer - Only show if cart has items */}
        {cartItems.length > 0 && (
          <div className='p-4 border-t border-gray-200 flex-shrink-0'>
            {/* Total Price Display */}
            <div className='flex justify-between items-center mb-4'>
              <span className='text-lg font-semibold'>총 주문 금액:</span>
              <span className='text-xl font-bold text-ml-yellow'>
                {' '}
                {/* Assuming ml-yellow for emphasis */}
                {totalPrice.toLocaleString()}원
              </span>
            </div>

            {/* Order Button */}
            <button
              onClick={handlePlaceOrder}
              className='w-full bg-ml-yellow hover:brightness-95 transition-all duration-150 ease-in-out text-white font-bold py-3 px-4 rounded text-lg' // Larger padding/text
            >
              주문하기
            </button>
          </div>
        )}
      </aside>

      {/* Order Confirmation Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 max-w-sm w-full mx-4 '>
            <h3 className='text-xl font-bold text-center mb-4'>
              주문이 완료되었습니다
            </h3>
            <div className='flex justify-center'>
              <button
                onClick={handleConfirmOrder}
                className='bg-ml-yellow hover:brightness-95 text-white font-bold py-2 px-6 rounded'
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
