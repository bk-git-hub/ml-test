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
    <div className="flex">
      <aside className="bg-ml-yellow rounded-xl shadow-lg p-4 mt-4 mb-6 ml-4 w-40 flex flex-col select-none">
        {/* 상단 로고 & 타이틀 */}


        {/* 카테고리 목록 */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-ml-yellow-light scrollbar-track-ml-yellow/20">
          <ul className="flex flex-col gap-2">
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
                      'w-full py-3 rounded-lg text-center transition-colors duration-300 ease-in-out text-sm font-semibold',
                      isActive
                        ? 'bg-white text-ml-yellow shadow-lg underline decoration-ml-yellow decoration-2 underline-offset-4'
                        : 'text-white hover:bg-white/30 hover:text-ml-yellow'
                    )}
                  >
                    {category.category_name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* 주문내역조회 버튼 */}
        <div className="w-full mt-6">
          <button
            onClick={handleOrderHistoryClick}
            className={clsx(
              'w-full font-semibold py-3 rounded-md text-sm bg-white text-ml-yellow transition duration-200 ease-in-out hover:brightness-90 shadow-sm',
              currentView === 'orderHistory' && 'shadow-inner'
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
