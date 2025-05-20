import React, { useEffect } from 'react';
import { useOrderHistoryStore } from '@/store/orderHistoryStore';
import { useLanguageStore } from '@/store/languageStore';

const OrderHistoryPage: React.FC = () => {
  const { orders, fetchOrders, isLoading, error } = useOrderHistoryStore();
  const { language } = useLanguageStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // 상태 텍스트를 언어별로 매핑
  const getStatusLabel = (status: string) => {
    const labels: Record<string, { ko: string; en: string }> = {
      completed: { ko: '완료', en: 'Completed' },
      pending: { ko: '대기중', en: 'Pending' },
      cancelled: { ko: '취소됨', en: 'Cancelled' },
    };
    return labels[status]?.[language] ?? status;
  };

  return (
    <div className='h-full overflow-y-auto bg-gray-50 p-4'>
      <h1 className='text-2xl font-bold mb-6'>
        {language === 'en' ? 'Order History' : '주문 내역'}
      </h1>

      {isLoading && (
        <p>
          {language === 'en'
            ? 'Loading orders...'
            : '주문 내역을 불러오는 중...'}
        </p>
      )}
      {error && <p className='text-red-600'>{error}</p>}

      <div className='space-y-4'>
        {orders.length === 0 && !isLoading && (
          <p>
            {language === 'en' ? 'No orders found.' : '주문 내역이 없습니다.'}
          </p>
        )}

        {orders.map((order) => (
          <div key={order.id} className='bg-white rounded-lg shadow p-4'>
            <div className='flex justify-between items-start mb-3'>
              <div>
                <h2 className='text-lg font-semibold'>
                  {language === 'en' ? 'Order Number' : '주문번호'}:{' '}
                  {order.orderNumber}
                </h2>
                <p className='text-sm text-gray-500'>
                  {new Date(order.createdAt).toLocaleString(
                    language === 'en' ? 'en-US' : 'ko-KR'
                  )}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  order.status === 'completed'
                    ? 'bg-indigo-100 text-indigo-800' // 인디고 계열
                    : order.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800' // 인디고와 대비되는 노랑 계열
                    : 'bg-gray-100 text-gray-800' // 중립 회색 계열
                }`}
              >
                {getStatusLabel(order.status)}
              </span>
            </div>
            <div className='space-y-2 mb-3'>
              {order.items.map((item, idx) => (
                <div key={idx} className='flex justify-between text-sm'>
                  <span>
                    {item.menuName} x {item.quantity}
                  </span>
                  <span>{(item.price * item.quantity).toLocaleString()} ₩</span>
                </div>
              ))}
            </div>
            <div className='border-t pt-3'>
              <div className='flex justify-between font-semibold'>
                <span>{language === 'en' ? 'Total Amount' : '총 금액'}</span>
                <span>{order.totalAmount.toLocaleString()} ₩</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
