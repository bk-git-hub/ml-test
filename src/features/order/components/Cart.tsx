import { useCartStore } from '@/store/cartStore';
import CartItem from './CartItem';
import { CartItemType } from '../types';
import { useOrderStore } from '../store/orderStore';
import OrderConfirmationModal from './OrderConfirmationModal';

const Cart = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const { setShowOrderModal } = useOrderStore();

  const totalPrice = cartItems.reduce(
    (total: number, item: CartItemType) =>
      total + item.menu.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    setShowOrderModal(true);
  };

  return (
    <>
      <aside className="w-65 bg-[#FFF9F0] rounded-xl shadow-lg p-6 mt-4 mb-6 mr-6 ml-4 flex flex-col">
        {/* Header */}
        <div className="mb-3">
          <h2 className="text-2xl font-semibold text-gray-800 text-center tracking-wide">
            장바구니
          </h2>
        </div>

        {/* 카트 리스트 */}
          <div className="flex-1 overflow-y-auto pr-1">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center mt-16 text-gray-400 select-none">
                {/* 이미지 넣을 경우 */}
                <img
                  src="/public/empty-cart.png" // 이미지 경로 바꿔주세요
                  alt="빈 장바구니 아이콘"
                  className="w-12 h-12 mb-4"
                />

                <p className="text-center text-gray-600 text-base font-medium">
                  장바구니가 비어 있어요
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  원하는 메뉴를 먼저 골라주세요
                </p>
              </div>

            ) : (
              cartItems.map((item, idx) => (
                <CartItem
                  key={item.menu.id}
                  item={item}
                  isLast={idx === cartItems.length - 1}
                />
              ))
            )}
          </div>

          {/* Footer (하단 띄워진 느낌) */}
          {cartItems.length > 0 && (
            <div className="pt-4 mt-4 bg-[#FFF9F0] border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="text-base font-medium text-gray-700">총 주문 금액:</span>
                <span className="text-2xl font-bold text-gradient bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  {totalPrice.toLocaleString()}원
                </span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600
                           text-white font-semibold py-4 rounded-xl shadow-md transition duration-300 ease-in-out
                           focus:outline-none focus:ring-4 focus:ring-yellow-300"
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
