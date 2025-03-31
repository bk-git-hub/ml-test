import React from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';

const EntryContent: React.FC = () => {
  const navigate = useNavigate();

  const handleStartOrder = () => {
    navigate('/order');
  };

  return (
    <div
      className='relative flex flex-col items-center justify-center h-full p-4 cursor-pointer'
      onClick={handleStartOrder}
    >
      <div className='absolute top-4 right-4'>
        <LanguageSelector />
      </div>
      <div className='flex flex-col items-center justify-center text-center'>
        <h1 className='text-4xl font-bold mb-4'>
          말랑 키오스크에 오신 것을 환영합니다!
        </h1>
        <p className='text-lg mb-8 animate-pulse'>
          {' '}
          {/* 깜빡이는 효과 적용 */}
          "화면을 터치하여 주문을 시작하세요."
        </p>
      </div>
    </div>
  );
};

export default EntryContent;
