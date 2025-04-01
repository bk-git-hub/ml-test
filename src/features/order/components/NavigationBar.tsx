// src/features/order/components/NavigationBar.tsx

import React from 'react';
import { mockCategories } from '@/mocks/categories';
import { Category } from '@/types/order';

const NavigationBar: React.FC = () => {
  return (
    <aside className='w-64 bg-gray-100 p-4 flex flex-col'>
      <nav className='flex-1 overflow-y-auto'>
        <ul>
          {mockCategories.map((category: Category) => (
            <li key={category.category_id} className='mb-2'>
              <button className='w-full text-left hover:bg-gray-200 p-2 rounded'>
                {category.category_name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className='mt-4'>
        <button className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          주문 내역 조회
        </button>
      </div>
    </aside>
  );
};

export default NavigationBar;
