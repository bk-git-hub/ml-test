type CartItemProps = {
  title: string;
  price: number;
  quantity: number;

  onRemove?: () => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
};

export default function CartItem({
  title,
  price,
  quantity,

  onRemove,
  onIncrease,
  onDecrease,
}: CartItemProps) {
  return (
    <div className='flex items-center gap-4 p-4 border-[4px] border-gray-200 bg-white'>
      <div className='flex-1'>
        <h3 className='text-md font-semibold'>{title}</h3>
        <p className='text-sm text-gray-500'>{price}</p>
        <div className='flex items-center gap-2 mt-2'>
          <button
            className='px-2 py-1 bg-gray-200 rounded'
            onClick={onDecrease}
          >
            -
          </button>
          <span className='text-md font-semibold'>{quantity}</span>
          <button
            className='px-2 py-1 bg-gray-200 rounded'
            onClick={onIncrease}
          >
            +
          </button>
        </div>
      </div>
      <button className='text-red-500 text-sm' onClick={onRemove}>
        삭제
      </button>
    </div>
  );
}
