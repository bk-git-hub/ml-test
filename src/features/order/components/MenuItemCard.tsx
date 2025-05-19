import { Menu } from '@/types/menu';
import { useCartStore } from '@/store/cartStore';
import { useLanguageStore } from '@/store/languageStore';  // 추가

interface MenuItemCardProps {
  menu: Menu;
  isSearched: boolean;
  displayName?: string;
}

const MenuItemCard = ({ menu, isSearched, displayName }: MenuItemCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const { language } = useLanguageStore();  // language 상태 받아오기

  const handleAddToCart = () => {
    console.log(`Adding ${displayName ?? menu.name} to cart`);
    addItem(menu);
  };

  return (
    <div
      className={`bg-indigo-100 rounded-lg shadow hover:shadow-md transition-shadow duration-200 ease-in-out overflow-hidden flex flex-col p-4 gap-4 items-center ${
        isSearched
          ? 'animate-[pulse_1s_ease-in-out_5] border-2 border-indigo-300 ring-2 ring-indigo-300'
          : ''
      }`}
    >
      {/* Image */}
      <img
        src={menu.imageUrl}
        alt={displayName ?? menu.name}
        className={`w-[80%] object-cover ${
          isSearched ? 'animate-[pulse_1s_ease-in-out_5]' : ''
        }`}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = '/logo.png';
        }}
      />

      {/* Content Area */}
      <div className="flex flex-col flex-grow w-full">
        {/* Name and Price */}
        <div className="flex-grow mb-3">
          <h3
            className={`font-semibold text-md mb-1 truncate text-center text-indigo-900 ${
              isSearched ? 'animate-[pulse_1s_ease-in-out_5]' : ''
            }`}
            title={displayName ?? menu.name}
          >
            {displayName ?? menu.name}
          </h3>
          <p
            className={`text-sm text-indigo-700 text-center ${
              isSearched ? 'animate-[pulse_1s_ease-in-out_5]' : ''
            }`}
          >
            {menu.price.toLocaleString()}원
          </p>
        </div>
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`mt-auto w-full bg-white hover:bg-indigo-200 font-semibold py-2 px-3 rounded text-sm transition-colors duration-150 ease-in-out ${
            isSearched ? 'animate-[pulse_1s_ease-in-out_5]' : ''
          }`}
        >
        {language === 'en' ? 'Add to cart' : '담기'}
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;
