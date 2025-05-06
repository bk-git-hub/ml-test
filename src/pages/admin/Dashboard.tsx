import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1 className='text-2xl font-semibold text-gray-900 mb-6'>대시보드</h1>

      {/* Summary Cards */}
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
        {/* Today's Orders */}
        <div className='bg-white overflow-hidden shadow rounded-lg'>
          <div className='p-5'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-6 w-6 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                  />
                </svg>
              </div>
              <div className='ml-5 w-0 flex-1'>
                <dl>
                  <dt className='text-sm font-medium text-gray-500 truncate'>
                    오늘의 주문
                  </dt>
                  <dd className='text-lg font-medium text-gray-900'>0건</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Total Menu Items */}
        <div className='bg-white overflow-hidden shadow rounded-lg'>
          <div className='p-5'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-6 w-6 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 10h16M4 14h16M4 18h16'
                  />
                </svg>
              </div>
              <div className='ml-5 w-0 flex-1'>
                <dl>
                  <dt className='text-sm font-medium text-gray-500 truncate'>
                    전체 메뉴
                  </dt>
                  <dd className='text-lg font-medium text-gray-900'>0개</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Total Categories */}
        <div className='bg-white overflow-hidden shadow rounded-lg'>
          <div className='p-5'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-6 w-6 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
                  />
                </svg>
              </div>
              <div className='ml-5 w-0 flex-1'>
                <dl>
                  <dt className='text-sm font-medium text-gray-500 truncate'>
                    전체 카테고리
                  </dt>
                  <dd className='text-lg font-medium text-gray-900'>0개</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className='mt-8'>
        <h2 className='text-lg font-medium text-gray-900 mb-4'>최근 주문</h2>
        <div className='bg-white shadow overflow-hidden sm:rounded-md'>
          <ul className='divide-y divide-gray-200'>
            <li className='px-6 py-4 text-center text-gray-500'>
              최근 주문이 없습니다.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
