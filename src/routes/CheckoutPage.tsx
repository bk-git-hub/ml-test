import CartContainer from '../components/CartContainer';

export default function CheckoutPage() {
  return (
    <div className='flex flex-col h-screen'>
      <p className='text-6xl text-center p-4'>주문을 완료하시겠습니까?</p>
      <div className='grow'>
        <CartContainer />;
      </div>
    </div>
  );
}
