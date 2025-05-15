import { useNavigationStore } from '@/store/navigationStore';
import { useMenuStore } from '@/store/menuStore';
import clsx from 'clsx';

const CategoryList = () => {
  const {
    currentCategoryId,
    setCurrentCategory,
    initializeCategory,
    setCurrentView,
    currentView,
  } = useNavigationStore();
  const { categories } = useMenuStore();

  if (!currentCategoryId) {
    initializeCategory();
  }

  const handleCategoryClick = (categoryId: number) => {
    setCurrentView('menu');
    setCurrentCategory(categoryId === currentCategoryId ? null : categoryId);
  };

  const handleOrderHistoryClick = () => {
    setCurrentView('orderHistory');
  };

  return (
    <div className='flex flex-col '>
      <aside className='w-50 bg-ml-gray p-4 flex flex-col h-screen'>
        <nav className='flex-1 overflow-y-auto'>
          <ul>
            {categories.map((categories) => {
              // 현재 카테고리가 활성화된 카테고리인지 확인
              const isActive =
                !isNaN(currentCategoryId) &&
                currentView === 'menu' &&
                categories.category_id === currentCategoryId;

              return (
                <li key={categories.category_id} className='mb-2'>
                  <button
                    onClick={() => handleCategoryClick(categories.category_id)}
                    // clsx를 사용하여 조건부 클래스 적용
                    className={clsx(
                      'w-full text-xl text-left hover:bg-gray-200 p-2 rounded transition-colors duration-150 ease-in-out', // 기본 및 호버 스타일
                      {
                        // isActive가 true일 때 적용될 스타일
                        'font-semibold underline decoration-ml-yellow decoration-2 underline-offset-4':
                          isActive,
                        // isActive가 false일 때 적용될 스타일 (필요하다면)
                        'font-normal': !isActive,
                      }
                    )}
                  >
                    {categories.category_name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className=' bg-ml-gray'>
          <button
            onClick={handleOrderHistoryClick}
            className={clsx(
              'w-full transition-all duration-150 ease-in-out font-bold py-2 px-4 rounded',
              currentView === 'orderHistory'
                ? 'bg-gray-200 text-gray-700'
                : 'bg-ml-yellow hover:brightness-95 text-white'
            )}
          >
            {'주문 내역 조회'}
          </button>
        </div>
      </aside>
    </div>
  );
};

export default CategoryList;
