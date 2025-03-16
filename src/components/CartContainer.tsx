import { cartItems } from '../assets/mockData';
import CartItem from './CartItem';

export default function CartContainer() {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className='w-full h-full bg-red-100 flex flex-col'>
      <h2 className='text-3xl w-full text-center p-4'>장바구니</h2>

      <ul className='grow'>
        {cartItems.map((item, index) => (
          <li key={index}>
            <CartItem key={item.title} {...item} />
          </li>
        ))}
      </ul>
      <div className='w-full mt-5 text-xl font-bold p-4'>
        총 가격: ₩{totalPrice.toLocaleString()}
      </div>
      <button className='text-xl bg-red-500 text-white p-5'>주문하기</button>
    </div>
  );
}
