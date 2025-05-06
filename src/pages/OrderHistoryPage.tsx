import React from 'react';

const OrderHistoryPage: React.FC = () => {
  return (
    <div className='h-full overflow-y-auto bg-gray-50 p-4'>
      <h1 className='text-2xl font-bold mb-6'>주문 내역</h1>
      <div className='space-y-4'>
        {/* 주문 내역 카드 */}
        <div className='bg-white rounded-lg shadow p-4'>
          <div className='flex justify-between items-start mb-3'>
            <div>
              <h2 className='text-lg font-semibold'>주문번호: #12345</h2>
              <p className='text-sm text-gray-500'>2024-03-20 14:30</p>
            </div>
            <span className='px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm'>
              완료
            </span>
          </div>
          <div className='space-y-2 mb-3'>
            <div className='flex justify-between text-sm'>
              <span>아메리카노 x 2</span>
              <span>9,000원</span>
            </div>
            <div className='flex justify-between text-sm'>
              <span>카페라떼 x 1</span>
              <span>5,000원</span>
            </div>
          </div>
          <div className='border-t pt-3'>
            <div className='flex justify-between font-semibold'>
              <span>총 금액</span>
              <span>14,000원</span>
            </div>
          </div>
        </div>

        {/* 두 번째 주문 내역 카드 */}
        <div className='bg-white rounded-lg shadow p-4'>
          <div className='flex justify-between items-start mb-3'>
            <div>
              <h2 className='text-lg font-semibold'>주문번호: #12344</h2>
              <p className='text-sm text-gray-500'>2024-03-20 13:15</p>
            </div>
            <span className='px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm'>
              대기중
            </span>
          </div>
          <div className='space-y-2 mb-3'>
            <div className='flex justify-between text-sm'>
              <span>바닐라라떼 x 1</span>
              <span>5,500원</span>
            </div>
          </div>
          <div className='border-t pt-3'>
            <div className='flex justify-between font-semibold'>
              <span>총 금액</span>
              <span>5,500원</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
