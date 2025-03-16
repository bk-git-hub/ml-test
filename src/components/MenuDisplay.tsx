import { menuItems } from '../assets/mockData';
import MenuCard from './MenuCard';

export default function MenuDisplay() {
  return (
    <div className='w-full h-[70%] flex flex-col items-center'>
      <div className='grow bg-blue-400 grid grid-rows-2 grid-cols-3 gap-4 p-5'>
        {menuItems.map((item) => (
          <MenuCard {...item} />
        ))}
      </div>
    </div>
  );
}
