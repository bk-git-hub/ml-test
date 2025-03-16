import { menuItems } from '../assets/mockData';
import MenuCard from './MenuCard';

export default function MenuDisplay() {
  return (
    <div className='w-full h-[70%] flex flex-col items-center'>
      <div className='w-full h-full grid grid-rows-2 grid-cols-3 gap-4 p-5 bg-gray-300'>
        {menuItems.map((item) => (
          <MenuCard {...item} />
        ))}
      </div>
    </div>
  );
}
