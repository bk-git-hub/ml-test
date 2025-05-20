import React, { useEffect } from 'react';
import { useOrderHistoryStore } from '@/store/orderHistoryStore';
import { useLanguageStore } from '@/store/languageStore';
import { useParams } from 'react-router-dom';

const OrderHistoryPage: React.FC = () => {
  const { orders, fetchOrders, isLoading, error } = useOrderHistoryStore();
  const { language } = useLanguageStore();
  const { kioskId } = useParams();

  useEffect(() => {
    if (kioskId) {
      fetchOrders(Number(kioskId));
    }
  }, [fetchOrders, kioskId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // UTC 시간에 9시간을 더해 한국 시간으로 변환
    date.setHours(date.getHours() + 9);
    return date.toLocaleString(language === 'en' ? 'en-US' : 'ko-KR');
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
          <div key={order.orderId} className='bg-white rounded-lg shadow p-4'>
            <div className='flex justify-between items-start mb-3'>
              <div>
                <h2 className='text-lg font-semibold'>
                  {language === 'en' ? 'Order Number' : '주문번호'}:{' '}
                  {order.orderId}
                </h2>
                <p className='text-sm text-gray-500'>
                  {formatDate(order.createdAt)}
                </p>
              </div>
            </div>
            <div className='space-y-2 mb-3'>
              {order.items.map((item, idx) => (
                <div key={idx} className='flex justify-between text-sm'>
                  <span>
                    {language === 'en' && item.menuNameEn
                      ? item.menuNameEn
                      : item.menuName}{' '}
                    x {item.quantity}
                  </span>
                  <span>
                    {(item.menuPrice * item.quantity).toLocaleString()} ₩
                  </span>
                </div>
              ))}
            </div>
            <div className='border-t pt-3'>
              <div className='flex justify-between font-semibold'>
                <span>{language === 'en' ? 'Total Amount' : '총 금액'}</span>
                <span>
                  {order.items
                    .reduce(
                      (total, item) => total + item.menuPrice * item.quantity,
                      0
                    )
                    .toLocaleString()}{' '}
                  ₩
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
