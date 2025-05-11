import { useNavigate, useParams } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';

const EntryContent = () => {
  const navigate = useNavigate();
  const { storeId, tableNumber } = useParams();

  const handleStartOrder = () => {
    navigate(`order`);
  };

  return (
    <div
      className='relative flex flex-col items-center justify-center h-full p-4 cursor-pointer bg-[#FFFDF6]'
      onClick={handleStartOrder}
    >
      <div className='absolute top-4 right-4'>
        <LanguageSelector />
      </div>
      <div className='text-[#5C504D] flex flex-col items-center justify-center text-center'>
        <img src='/logo.png' width={300} height={300} />
        <p className='text-5xl mb-8 animate-pulse'>
          {' '}
          {/* 깜빡이는 효과 적용 */}
          "화면을 터치하여 주문을 시작하세요."
        </p>
      </div>
    </div>
  );
};

export default EntryContent;
