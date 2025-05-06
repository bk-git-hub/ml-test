import { useState } from 'react';
import { useMenuStore } from '../store/menuStore';

const OrderPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const {
    //menus,
    categories,
    isLoading,
    error,
    getMenusByCategory,
    //getCategoryById,
  } = useMenuStore();

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-red-500'>에러가 발생했습니다: {error}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-gray-500'>메뉴를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* 카테고리 네비게이션 */}
      <div className='flex space-x-4 mb-8 overflow-x-auto'>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* 메뉴 목록 */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {selectedCategory &&
          getMenusByCategory(selectedCategory).map((menu) => (
            <div
              key={menu.id}
              className='bg-white rounded-lg shadow-md overflow-hidden'
            >
              {menu.imageUrl && (
                <img
                  src={menu.imageUrl}
                  alt={menu.name}
                  className='w-full h-48 object-cover'
                />
              )}
              <div className='p-4'>
                <h3 className='text-lg font-semibold'>{menu.name}</h3>
                <p className='text-gray-600 text-sm mt-1'>{menu.description}</p>
                <p className='text-blue-500 font-semibold mt-2'>
                  {menu.price.toLocaleString()}원
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrderPage;
