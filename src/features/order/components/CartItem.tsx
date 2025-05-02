// src/features/order/components/CartItemComponent.tsx

import { useCartStore } from '@/store/cartStore';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid'; // Example icons (install @heroicons/react)
import { CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleIncrease = () => {
    updateQuantity(item.menu.menu_id, item.quantity + 1);
  };

  const handleDecrease = () => {
    // Remove if quantity becomes 0, otherwise update
    if (item.quantity - 1 <= 0) {
      handleRemove();
    } else {
      updateQuantity(item.menu.menu_id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeItem(item.menu.menu_id);
  };

  return (
    <div className='flex items-center py-3 border-b border-gray-200 last:border-b-0'>
      {/* Left: Image */}
      <img
        src={item.menu.menu_img_url || 'https://via.placeholder.com/64'} // Placeholder if no image
        alt={item.menu.menu_name}
        className='w-16 h-16 object-cover rounded mr-3 flex-shrink-0' // Fixed size image
      />

      {/* Middle: Name and Price */}
      <div className='flex-grow mr-3'>
        <p className='font-semibold text-sm mb-1'>{item.menu.menu_name}</p>
        <p className='text-xs text-gray-600'>
          {item.menu.menu_price.toLocaleString()}원 {/* Format price */}
        </p>
      </div>

      {/* Right: Quantity Controls */}
      <div className='flex items-center flex-shrink-0'>
        <button
          onClick={handleDecrease}
          className='p-1 rounded-full hover:bg-gray-200 transition-colors'
          aria-label='Decrease quantity'
        >
          <MinusIcon className='w-4 h-4 text-gray-600' />
        </button>
        <span className='mx-2 w-6 text-center font-medium text-sm'>
          {item.quantity}
        </span>
        <button
          onClick={handleIncrease}
          className='p-1 rounded-full hover:bg-gray-200 transition-colors'
          aria-label='Increase quantity'
        >
          <PlusIcon className='w-4 h-4 text-gray-600' />
        </button>
        {/* Optional: Explicit Remove Button */}
        {/* <button
           onClick={handleRemove}
           className="ml-2 p-1 text-red-500 hover:text-red-700"
           aria-label="Remove item"
         >
           <TrashIcon className="w-4 h-4" />
         </button> */}
      </div>
    </div>
  );
};

export default CartItem;
