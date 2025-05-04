// src/features/order/components/MenuItemCard.tsx
import { Menu } from '../types';
import { useCartStore } from '@/store/cartStore';

interface MenuItemCardProps {
  menu: Menu;
}

const MenuItemCard = ({ menu }: MenuItemCardProps) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    console.log(`Adding ${menu.menu_name} to cart`);
    addItem(menu);
  };

  return (
    <div className='bg-ml-yellow rounded-lg shadow hover:shadow-md transition-shadow duration-200 ease-in-out overflow-hidden flex flex-col p-4 gap-4 items-center'>
      {/* Image */}
      <img
        src={menu.menu_img_url}
        alt={menu.menu_name}
        className='w-[80%] object-cover'
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = '/logo.png';
        }}
      />

      {/* Content Area */}
      <div className='flex flex-col flex-grow w-full'>
        {' '}
        {/* Use flex-grow to push button down */}
        {/* Name and Price */}
        <div className='flex-grow mb-3'>
          {' '}
          {/* Use flex-grow here too */}
          <h3
            className='font-semibold text-md mb-1 truncate'
            title={menu.menu_name}
          >
            {menu.menu_name}
          </h3>
          <p className='text-sm text-gray-700'>
            {menu.menu_price.toLocaleString()}원
          </p>
        </div>
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className='mt-auto w-full bg-white hover:bg-blue-600  font-semibold py-2 px-3 rounded text-sm transition-colors duration-150 ease-in-out' // Added mt-auto
        >
          담기
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;
