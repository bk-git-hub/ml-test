import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StoreEntry = () => {
  const [storeName, setStoreName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Implement actual validation with backend
    // For now, use fixed values
    const storeId = 101;
    const tableNum = 11;

    // Navigate to the order page
    navigate(`/${storeId}/${tableNum}`);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            주문을 시작해주세요
          </h2>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='store-name' className='sr-only'>
                가게 이름
              </label>
              <input
                id='store-name'
                name='store-name'
                type='text'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-ml-yellow focus:border-ml-yellow focus:z-10 sm:text-sm'
                placeholder='가게 이름'
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='table-number' className='sr-only'>
                테이블 번호
              </label>
              <input
                id='table-number'
                name='table-number'
                type='number'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-ml-yellow focus:border-ml-yellow focus:z-10 sm:text-sm'
                placeholder='테이블 번호'
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-ml-yellow hover:bg-ml-yellow-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ml-yellow'
            >
              시작하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoreEntry;
