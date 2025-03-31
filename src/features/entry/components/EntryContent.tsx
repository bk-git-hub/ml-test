// src/features/entry/components/EntryContent.tsx

import React from 'react';

const EntryContent: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <h1 className='text-4xl font-bold mb-4'>
        말랑 키오스크에 오신 것을 환영합니다!
      </h1>
      <p className='text-lg mb-8'>주문을 시작하려면 아래 버튼을 눌러주세요.</p>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        주문 시작
      </button>
    </div>
  );
};

export default EntryContent;
