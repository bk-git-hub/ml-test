import CartContainer from '../components/CartContainer';
import ChatDisplay from '../components/ChatDisplay';
import MenuDisplay from '../components/MenuDisplay';

export default function OrderPage() {
  return (
    <div className='flex w-screen h-screen'>
      <div className='w-[70%] h-full flex flex-col border-r-8 border-white'>
        <MenuDisplay />
        <ChatDisplay />
      </div>
      <div className='w-[30%] h-full'>
        {' '}
        <CartContainer />
      </div>
    </div>
  );
}
