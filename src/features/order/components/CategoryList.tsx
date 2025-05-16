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
  <div className='flex'>
    {/* 왼쪽 고정 직사각형 카테고리 박스 */}
    <aside className='bg-ml-yellow rounded-lg shadow-md p-4 mt-6 mb-6 ml-2 w-48 flex flex-col items-center'>
      <nav className='flex-1 w-full'>
        <ul className='space-y-2'>
          {categories.map((category) => {
            const isActive =
              !isNaN(currentCategoryId) &&
              currentView === 'menu' &&
              category.category_id === currentCategoryId;

            return (
              <li key={category.category_id}>
                <button
                  onClick={() => handleCategoryClick(category.category_id)}
                  className={clsx(
                    'w-full text-md text-center hover:bg-white/20 p-2 rounded transition-colors duration-150 ease-in-out',
                    {
                      'font-semibold underline decoration-white decoration-2 underline-offset-4':
                        isActive,
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

      {/* 주문내역 버튼 */}
      <div className='w-full mt-4'>
        <button
          onClick={handleOrderHistoryClick}
          className={clsx(
            'w-full font-bold py-2 px-4 rounded',
            currentView === 'orderHistory'
              ? 'bg-white text-ml-yellow'
              : 'bg-white hover:brightness-95 text-ml-yellow'
          )}
        >
          주문 내역 조회
        </button>
      </div>
    </aside>
  </div>
);

};

export default CategoryList;
