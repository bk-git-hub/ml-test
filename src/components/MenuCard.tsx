import { mockItem } from '../types/mockItem';

export default function MenuCard({
  title,
  description,
  price,
  imageUrl,
}: mockItem) {
  return (
    <div className='max-w-xs rounded-2xl overflow-hidden shadow-lg bg-white p-4 flex flex-col items-center'>
      <img className=' object-cover rounded-full' src={imageUrl} alt={title} />
      <h2 className='text-lg font-bold mt-3'>{title}</h2>
      <p className='text-sm text-gray-600 text-center mt-1'>{description}</p>
      <span className='text-lg font-semibold text-blue-500 mt-2'>{price}</span>
    </div>
  );
}
