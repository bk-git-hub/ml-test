import React, { useState } from 'react';

interface Category {
  id: string;
  name: string;
  description: string;
}

const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) return;

    const category: Category = {
      id: Date.now().toString(),
      name: newCategory.name.trim(),
      description: newCategory.description.trim(),
    };

    setCategories([...categories, category]);
    setNewCategory({ name: '', description: '' });
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
  };

  const handleUpdateCategory = () => {
    if (!editingCategory) return;

    setCategories(
      categories.map((category) =>
        category.id === editingCategory.id ? editingCategory : category
      )
    );
    setEditingCategory(null);
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter((category) => category.id !== categoryId));
  };

  return (
    <div>
      <h1 className='text-2xl font-semibold text-gray-900 mb-6'>
        카테고리 관리
      </h1>

      {/* Add New Category Form */}
      <div className='bg-white shadow sm:rounded-lg mb-6'>
        <div className='px-4 py-5 sm:p-6'>
          <h3 className='text-lg font-medium leading-6 text-gray-900 mb-4'>
            새 카테고리 추가
          </h3>
          <div className='space-y-4'>
            <div>
              <label
                htmlFor='category-name'
                className='block text-sm font-medium text-gray-700'
              >
                카테고리명
              </label>
              <input
                type='text'
                id='category-name'
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ml-yellow focus:ring-ml-yellow sm:text-sm'
                placeholder='카테고리명을 입력하세요'
              />
            </div>
            <div>
              <label
                htmlFor='category-description'
                className='block text-sm font-medium text-gray-700'
              >
                설명
              </label>
              <textarea
                id='category-description'
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
                rows={3}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ml-yellow focus:ring-ml-yellow sm:text-sm'
                placeholder='카테고리에 대한 설명을 입력하세요'
              />
            </div>
            <button
              type='button'
              onClick={handleAddCategory}
              className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ml-yellow hover:bg-ml-yellow/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ml-yellow'
            >
              카테고리 추가
            </button>
          </div>
        </div>
      </div>

      {/* Categories List */}
      <div className='bg-white shadow overflow-hidden sm:rounded-md'>
        {categories.length === 0 ? (
          <div className='px-6 py-4 text-center text-gray-500'>
            등록된 카테고리가 없습니다.
          </div>
        ) : (
          <ul className='divide-y divide-gray-200'>
            {categories.map((category) => (
              <li key={category.id} className='px-6 py-4'>
                {editingCategory?.id === category.id ? (
                  <div className='space-y-4'>
                    <div>
                      <label
                        htmlFor='edit-category-name'
                        className='block text-sm font-medium text-gray-700'
                      >
                        카테고리명
                      </label>
                      <input
                        type='text'
                        id='edit-category-name'
                        value={editingCategory.name}
                        onChange={(e) =>
                          setEditingCategory({
                            ...editingCategory,
                            name: e.target.value,
                          })
                        }
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ml-yellow focus:ring-ml-yellow sm:text-sm'
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='edit-category-description'
                        className='block text-sm font-medium text-gray-700'
                      >
                        설명
                      </label>
                      <textarea
                        id='edit-category-description'
                        value={editingCategory.description}
                        onChange={(e) =>
                          setEditingCategory({
                            ...editingCategory,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ml-yellow focus:ring-ml-yellow sm:text-sm'
                      />
                    </div>
                    <div className='flex space-x-2'>
                      <button
                        type='button'
                        onClick={handleUpdateCategory}
                        className='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-ml-yellow hover:bg-ml-yellow/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ml-yellow'
                      >
                        저장
                      </button>
                      <button
                        type='button'
                        onClick={() => setEditingCategory(null)}
                        className='inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ml-yellow'
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className='flex items-center justify-between'>
                    <div>
                      <h3 className='text-lg font-medium text-gray-900'>
                        {category.name}
                      </h3>
                      <p className='mt-1 text-sm text-gray-500'>
                        {category.description}
                      </p>
                    </div>
                    <div className='flex space-x-2'>
                      <button
                        type='button'
                        onClick={() => handleEditCategory(category)}
                        className='inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ml-yellow'
                      >
                        수정
                      </button>
                      <button
                        type='button'
                        onClick={() => handleDeleteCategory(category.id)}
                        className='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
