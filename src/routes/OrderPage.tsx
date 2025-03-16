import CartContainer from '../components/CartContainer';
import ChatDisplay from '../components/ChatDisplay';
import MenuDisplay from '../components/MenuDisplay';

export default function OrderPage() {
  return (
    <div className='flex w-screen h-screen'>
      <div className='w-[70%] h-full flex flex-col'>
        <MenuDisplay />
        <ChatDisplay />
      </div>
      <CartContainer />
    </div>
  );
}
