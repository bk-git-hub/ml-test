import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKioskStore } from '../../../store/kioskStore';

const StoreEntry = () => {
  const [storeName, setStoreName] = useState('');
  const [kioskNumber, setTableNumber] = useState('');
  const navigate = useNavigate();
  const setKioskData = useKioskStore((state) => state.setKioskData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/kiosk/activate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            storeName,
            kioskNumber: parseInt(kioskNumber, 10),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to activate kiosk');
      }

      const data = await response.json();
      setKioskData(data);
      navigate(`/${data.kioskId}/order`);
    } catch (error) {
      console.error('Error activating kiosk:', error);
      // TODO: Add proper error handling/notification
    }
  };

  return (
    <div className='w-screen h-screen flex flex-col md:flex-row bg-white'>
      {/* Left Section */}
      <div className='w-full md:w-1/2 flex flex-col justify-center items-center px-10 space-y-6 bg-stone-50'>
        <h1 className='text-5xl font-bold text-indigo-600 mb-8'>
          Mallang Order
        </h1>

        <form onSubmit={handleSubmit} className='w-full max-w-sm space-y-5'>
          <div>
            <label
              htmlFor='store-name'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              가게 이름
            </label>
            <input
              id='store-name'
              name='store-name'
              type='text'
              required
              className='w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
              placeholder='가게 이름을 입력하세요'
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor='table-number'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              테이블 번호
            </label>
            <input
              id='table-number'
              name='table-number'
              type='number'
              required
              className='w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
              placeholder='테이블 번호를 입력하세요'
              value={kioskNumber}
              onChange={(e) => setTableNumber(e.target.value)}
            />
          </div>

          <button
            type='submit'
            className='w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            키오스크 등록
          </button>
        </form>
      </div>

      {/* Right Section */}
      <div className='w-full md:w-1/2 bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center'>
        <img
          src='/logoT.png'
          alt='Mallang character'
          className='w-3/4 max-h-[80%] object-contain'
        />
      </div>
    </div>
  );
};

export default StoreEntry;
