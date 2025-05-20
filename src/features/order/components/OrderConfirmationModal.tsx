import { useOrderStore } from '../store/orderStore';
import { useLanguageStore } from '@/store/languageStore';

const OrderConfirmationModal = () => {
  const { showOrderModal, handleOrderConfirmation } = useOrderStore();
  const { language } = useLanguageStore();

  if (!showOrderModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-lg">
        <h3 className="text-xl font-bold text-center mb-4 text-indigo-700">
          {language === 'en' ? 'Your order has been completed' : '주문이 완료되었습니다'}
        </h3>
        <div className="flex justify-center">
          <button
            onClick={handleOrderConfirmation}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-6 rounded transition-colors duration-200"
          >
            {language === 'en' ? 'Confirm' : '확인'}
          </button>
        </div>
      </div>
    </div>
  );

};

export default OrderConfirmationModal;
