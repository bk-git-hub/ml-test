import { useOrderStore } from '../store/orderStore';
import { useLanguageStore } from '@/store/languageStore';
import { useEffect, useState } from 'react';

const OrderConfirmationModal = () => {
  const { showOrderModal, handleOrderConfirmation } = useOrderStore();
  const { language } = useLanguageStore();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (showOrderModal) {
      const timer = setTimeout(() => {
        handleOrderConfirmation();
      }, 3000);

      setCountdown(3);
      const countdownTimer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(countdownTimer);
      };
    }
  }, [showOrderModal, handleOrderConfirmation]);

  if (!showOrderModal) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-lg'>
        <h3 className='text-xl font-bold text-center mb-4 text-indigo-700'>
          {language === 'en'
            ? 'Your order has been completed'
            : '주문이 완료되었습니다'}
        </h3>
        <p className='text-center text-gray-600'>
          {language === 'en'
            ? `Returning to home screen in ${countdown} seconds...`
            : `${countdown}초 후 초기화면으로 이동합니다...`}
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
