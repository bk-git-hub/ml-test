import CartContainer from '../components/CartContainer';
import MenuDisplay from '../components/MenuDisplay';

export default function OrderPage() {
  return (
    <div className='flex w-screen h-screen'>
      <MenuDisplay />
      <CartContainer />
    </div>
  );
}
