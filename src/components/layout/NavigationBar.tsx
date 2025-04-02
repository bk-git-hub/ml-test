import React from 'react';
// react-router-dom에서 필요한 훅 import
import { useNavigate, useParams } from 'react-router-dom';
import { mockCategories } from '@/mocks/categories'; // 경로가 맞는지 확인해주세요
import { Category } from '@/types/order'; // 경로가 맞는지 확인해주세요
import clsx from 'clsx'; // 조건부 클래스를 쉽게 적용하기 위해 clsx 라이브러리 사용 (선택 사항)
// clsx 설치: npm install clsx 또는 yarn add clsx

const NavigationBar: React.FC = () => {
  // 페이지 이동을 위한 navigate 함수
  const navigate = useNavigate();
  // URL 파라미터에서 categoryId를 가져오기 위함
  // 라우터 설정에서 경로가 /order/:categoryId 와 같이 정의되어 있어야 합니다.
  const params = useParams<{ categoryId?: string }>();

  // URL에서 가져온 categoryId를 숫자로 변환. 없거나 숫자가 아니면 NaN.
  const activeCategoryId = params.categoryId
    ? parseInt(params.categoryId, 10)
    : NaN;

  // 카테고리 버튼 클릭 핸들러
  const handleCategoryClick = (categoryId: number) => {
    navigate(`/order/${categoryId}`); // 해당 카테고리 ID로 경로 이동
  };

  // 주문 내역 조회 버튼 클릭 핸들러 (추후 구현 필요)
  const handleOrderHistoryClick = () => {
    console.log('주문 내역 조회 클릭됨');
    // navigate('/order-history'); // 예시: 주문 내역 페이지로 이동
  };

  return (
    <aside className='w-64 bg-ml-gray p-4 flex flex-col'>
      <nav className='flex-1 overflow-y-auto'>
        <ul>
          {mockCategories.map((category: Category) => {
            // 현재 카테고리가 활성화된 카테고리인지 확인
            const isActive =
              !isNaN(activeCategoryId) &&
              category.category_id === activeCategoryId;

            return (
              <li key={category.category_id} className='mb-2'>
                <button
                  onClick={() => handleCategoryClick(category.category_id)}
                  // clsx를 사용하여 조건부 클래스 적용
                  className={clsx(
                    'w-full text-left hover:bg-gray-200 p-2 rounded transition-colors duration-150 ease-in-out', // 기본 및 호버 스타일
                    {
                      // isActive가 true일 때 적용될 스타일
                      'font-semibold underline decoration-ml-yellow decoration-2 underline-offset-4':
                        isActive,
                      // isActive가 false일 때 적용될 스타일 (필요하다면)
                      'font-normal': !isActive,
                    }
                  )}
                >
                  {category.category_name}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className='mt-4'>
        <button
          onClick={handleOrderHistoryClick}
          // ml-yellow 배경색에 흰색 글씨가 잘 보이나요? 필요시 글자색 조정 (예: text-black)
          className='w-full bg-ml-yellow hover:brightness-95 transition-all duration-150 ease-in-out text-white font-bold py-2 px-4 rounded'
        >
          주문 내역 조회
        </button>
      </div>
    </aside>
  );
};

export default NavigationBar;
