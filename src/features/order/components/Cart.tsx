// src/features/order/components/CartComponent.tsx

import { useCartStore } from '@/store/cartStore';
import CartItem from './CartItem';
import { CartItemType } from '../types';
import { useOrderStore } from '../store/orderStore';
import OrderConfirmationModal from './OrderConfirmationModal';

const Cart = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const { setShowOrderModal } = useOrderStore();

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
    setShowOrderModal(true);
  };

  return (
    <>
      <aside className='w-60 bg-white border-l border-gray-200 flex flex-col h-full shrink-0'>
        {/*폭 60x4 =240 픽셀*/}
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

      <OrderConfirmationModal />
    </>
  );
};

export default Cart;
