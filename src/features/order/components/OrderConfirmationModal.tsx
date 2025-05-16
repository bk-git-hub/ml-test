import { useOrderStore } from '../store/orderStore';

const OrderConfirmationModal = () => {
  const { showOrderModal, handleOrderConfirmation } = useOrderStore();

  if (!showOrderModal) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 max-w-sm w-full mx-4'>
        <h3 className='text-xl font-bold text-center mb-4'>
          주문이 완료되었습니다
        </h3>
        <div className='flex justify-center'>
          <button
            onClick={handleOrderConfirmation}
            className='bg-ml-yellow hover:brightness-95 text-white font-bold py-2 px-6 rounded'
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
