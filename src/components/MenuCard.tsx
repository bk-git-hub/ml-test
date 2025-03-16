import { mockItem } from '../types/mockItem';

export default function MenuCard({ title, price, imageUrl }: mockItem) {
  return (
    <div className='h-auto rounded-2xl overflow-hidden shadow-lg bg-white p-2 flex flex-col items-center'>
      <img
        className='w-[80%] h-[60%] object-cover rounded-[8px]'
        src={imageUrl}
        alt={title}
      />
      <h2 className='font-bold mt-3'>{title}</h2>

      <span className='font-semibold text-blue-500 mt-2'>{price}</span>
    </div>
  );
}
