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
    updateQuantity(item.menu.id,  1);
  };

  const handleDecrease = () => {
    // Remove if quantity becomes 0, otherwise update
    if (item.quantity - 1 <= 0) {
      handleRemove();
    } else {
      updateQuantity(item.menu.id, - 1);
    }
  };

  const handleRemove = () => {
    removeItem(item.menu.id);
  };

  return (
    <div className="flex items-center py-2 border-b border-gray-200 last:border-b-0 mb-1 last:mb-0">
      {/* Left: Image */}
      <img
        src={item.menu.imageUrl}
        alt={item.menu.name}
        className="w-12 h-12 object-cover rounded mr-3 flex-shrink-0"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = '/logo.png';
        }}
      />

      {/* Middle: Name and Price */}
      <div className="flex-grow mr-3 min-w-0">
        <p className="font-semibold text-sm mb-1 whitespace-nowrap">{item.menu.name}</p>
        <p className="text-xs text-gray-600 whitespace-nowrap">
          {item.menu.price.toLocaleString()}원
        </p>
      </div>

      {/* Right: Quantity Controls */}
      <div className="flex items-center flex-shrink-0 space-x-1">
        <button
          onClick={handleDecrease}
          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Decrease quantity"
        >
          <MinusIcon className="w-3.5 h-3.5 text-gray-600" />
        </button>
        <span className="text-center font-medium text-sm w-5">{item.quantity}</span>
        <button
          onClick={handleIncrease}
          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Increase quantity"
        >
          <PlusIcon className="w-3.5 h-3.5 text-gray-600" />
        </button>
      </div>

    </div>

  );
};

export default CartItem;
