import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenuStore } from '../store/menuStore';

const EntryPage = () => {
  const navigate = useNavigate();
  const { fetchAllMenus, isLoading, error } = useMenuStore();

  useEffect(() => {
    // 엔트리 페이지 마운트 시 메뉴 데이터 로드
    fetchAllMenus();
  }, [fetchAllMenus]);

  const handleStartOrder = () => {
    navigate('/order');
  };

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-red-500'>에러가 발생했습니다: {error}</div>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='p-8 bg-white rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold text-center mb-8'>말랑카페</h1>
        <button
          onClick={handleStartOrder}
          disabled={isLoading}
          className='w-full px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-400'
        >
          {isLoading ? '메뉴 로딩 중...' : '주문 시작하기'}
        </button>
      </div>
    </div>
  );
};

export default EntryPage;
