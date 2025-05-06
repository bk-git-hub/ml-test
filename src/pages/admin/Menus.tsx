import React, { useState } from 'react';

interface Category {
  id: string;
  name: string;
}

interface Menu {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl?: string;
  isAvailable: boolean;
}

const AdminMenus: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [newMenu, setNewMenu] = useState<Partial<Menu>>({
    name: '',
    description: '',
    price: 0,
    categoryId: '',
    isAvailable: true,
  });
  const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  console.log(selectedFile);
  setCategories([]);

  const handleAddMenu = () => {
    if (!newMenu.name?.trim() || !newMenu.categoryId) return;

    const menu: Menu = {
      id: Date.now().toString(),
      name: newMenu.name.trim(),
      description: newMenu.description?.trim() || '',
      price: newMenu.price || 0,
      categoryId: newMenu.categoryId,
      imageUrl: newMenu.imageUrl,
      isAvailable: newMenu.isAvailable ?? true,
    };

    setMenus([...menus, menu]);
    setNewMenu({
      name: '',
      description: '',
      price: 0,
      categoryId: '',
      isAvailable: true,
    });
    setSelectedFile(null);
  };

  const handleEditMenu = (menu: Menu) => {
    setEditingMenu(menu);
  };

  const handleUpdateMenu = () => {
    if (!editingMenu) return;

    setMenus(
      menus.map((menu) => (menu.id === editingMenu.id ? editingMenu : menu))
    );
    setEditingMenu(null);
  };

  const handleDeleteMenu = (menuId: string) => {
    setMenus(menus.filter((menu) => menu.id !== menuId));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      // TODO: Implement file upload logic
    }
  };

  return (
    <div>
      <h1 className='text-2xl font-semibold text-gray-900 mb-6'>메뉴 관리</h1>

      {/* Add New Menu Form */}
      <div className='bg-white shadow sm:rounded-lg mb-6'>
        <div className='px-4 py-5 sm:p-6'>
          <h3 className='text-lg font-medium leading-6 text-gray-900 mb-4'>
            새 메뉴 추가
          </h3>
          <div className='space-y-4'>
            <div>
              <label
                htmlFor='menu-name'
                className='block text-sm font-medium text-gray-700'
              >
                메뉴명
              </label>
              <input
                type='text'
                id='menu-name'
                value={newMenu.name}
                onChange={(e) =>
                  setNewMenu({ ...newMenu, name: e.target.value })
                }
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ml-yellow focus:ring-ml-yellow sm:text-sm'
                placeholder='메뉴명을 입력하세요'
              />
            </div>
            <div>
              <label
                htmlFor='menu-category'
                className='block text-sm font-medium text-gray-700'
              >
                카테고리
              </label>
              <select
                id='menu-category'
                value={newMenu.categoryId}
                onChange={(e) =>
                  setNewMenu({ ...newMenu, categoryId: e.target.value })
                }
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ml-yellow focus:ring-ml-yellow sm:text-sm'
              >
                <option value=''>카테고리를 선택하세요</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor='menu-description'
                className='block text-sm font-medium text-gray-700'
              >
                설명
              </label>
              <textarea
                id='menu-description'
                value={newMenu.description}
                onChange={(e) =>
                  setNewMenu({ ...newMenu, description: e.target.value })
                }
                rows={3}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ml-yellow focus:ring-ml-yellow sm:text-sm'
                placeholder='메뉴에 대한 설명을 입력하세요'
              />
            </div>
            <div>
              <label
                htmlFor='menu-price'
                className='block text-sm font-medium text-gray-700'
              >
                가격
              </label>
              <input
                type='number'
                id='menu-price'
                value={newMenu.price}
                onChange={(e) =>
                  setNewMenu({ ...newMenu, price: Number(e.target.value) })
                }
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ml-yellow focus:ring-ml-yellow sm:text-sm'
                placeholder='가격을 입력하세요'
              />
            </div>
            <div>
              <label
                htmlFor='menu-image'
                className='block text-sm font-medium text-gray-700'
              >
                이미지
              </label>
              <input
                type='file'
                id='menu-image'
                onChange={handleFileChange}
                className='mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md 
                  file:text-sm file:font-semibold
                  file:border
                  file:border-ml-yellow file:text-black
                  hover:file:bg-indigo-100'
                accept='image/*'
              />
            </div>
            <div className='flex items-center'>
              <input
                type='checkbox'
                id='menu-available'
                checked={newMenu.isAvailable}
                onChange={(e) =>
                  setNewMenu({ ...newMenu, isAvailable: e.target.checked })
                }
                className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
              />
              <label
                htmlFor='menu-available'
                className='ml-2 block text-sm text-gray-900'
              >
                판매 가능
              </label>
            </div>
            <button
              type='button'
              onClick={handleAddMenu}
              className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ml-yellow hover:bg-ml-yellow/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ml-yellow'
            >
              메뉴 추가
            </button>
          </div>
        </div>
      </div>

      {/* Menus List */}
      <div className='bg-white shadow overflow-hidden sm:rounded-md'>
        {menus.length === 0 ? (
          <div className='px-6 py-4 text-center text-gray-500'>
            등록된 메뉴가 없습니다.
          </div>
        ) : (
          <ul className='divide-y divide-gray-200'>
            {menus.map((menu) => (
              <li key={menu.id} className='px-6 py-4'>
                {editingMenu?.id === menu.id ? (
                  <div className='space-y-4'>
                    <div>
                      <label
                        htmlFor='edit-menu-name'
                        className='block text-sm font-medium text-gray-700'
                      >
                        메뉴명
                      </label>
                      <input
                        type='text'
                        id='edit-menu-name'
                        value={editingMenu.name}
                        onChange={(e) =>
                          setEditingMenu({
                            ...editingMenu,
                            name: e.target.value,
                          })
                        }
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ml-yellow focus:ring-ml-yellow sm:text-sm'
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='edit-menu-category'
                        className='block text-sm font-medium text-gray-700'
                      >
                        카테고리
                      </label>
                      <select
                        id='edit-menu-category'
                        value={editingMenu.categoryId}
                        onChange={(e) =>
                          setEditingMenu({
                            ...editingMenu,
                            categoryId: e.target.value,
                          })
                        }
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ml-yellow focus:ring-ml-yellow sm:text-sm'
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor='edit-menu-description'
                        className='block text-sm font-medium text-gray-700'
                      >
                        설명
                      </label>
                      <textarea
                        id='edit-menu-description'
                        value={editingMenu.description}
                        onChange={(e) =>
                          setEditingMenu({
                            ...editingMenu,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ml-yellow focus:ring-ml-yellow sm:text-sm'
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='edit-menu-price'
                        className='block text-sm font-medium text-gray-700'
                      >
                        가격
                      </label>
                      <input
                        type='number'
                        id='edit-menu-price'
                        value={editingMenu.price}
                        onChange={(e) =>
                          setEditingMenu({
                            ...editingMenu,
                            price: Number(e.target.value),
                          })
                        }
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ml-yellow focus:ring-ml-yellow sm:text-sm'
                      />
                    </div>
                    <div className='flex items-center'>
                      <input
                        type='checkbox'
                        id='edit-menu-available'
                        checked={editingMenu.isAvailable}
                        onChange={(e) =>
                          setEditingMenu({
                            ...editingMenu,
                            isAvailable: e.target.checked,
                          })
                        }
                        className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                      />
                      <label
                        htmlFor='edit-menu-available'
                        className='ml-2 block text-sm text-gray-900'
                      >
                        판매 가능
                      </label>
                    </div>
                    <div className='flex space-x-2'>
                      <button
                        type='button'
                        onClick={handleUpdateMenu}
                        className='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-ml-yellow hover:bg-ml-yellow/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ml-yellow'
                      >
                        저장
                      </button>
                      <button
                        type='button'
                        onClick={() => setEditingMenu(null)}
                        className='inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ml-yellow'
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-4'>
                      {menu.imageUrl && (
                        <img
                          src={menu.imageUrl}
                          alt={menu.name}
                          className='h-16 w-16 object-cover rounded-md'
                        />
                      )}
                      <div>
                        <h3 className='text-lg font-medium text-gray-900'>
                          {menu.name}
                        </h3>
                        <p className='mt-1 text-sm text-gray-500'>
                          {menu.description}
                        </p>
                        <p className='mt-1 text-sm font-medium text-gray-900'>
                          {menu.price.toLocaleString()}원
                        </p>
                        <p className='mt-1 text-sm text-gray-500'>
                          카테고리:{' '}
                          {
                            categories.find((c) => c.id === menu.categoryId)
                              ?.name
                          }
                        </p>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            menu.isAvailable
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {menu.isAvailable ? '판매중' : '판매중지'}
                        </span>
                      </div>
                    </div>
                    <div className='flex space-x-2'>
                      <button
                        type='button'
                        onClick={() => handleEditMenu(menu)}
                        className='inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ml-yellow'
                      >
                        수정
                      </button>
                      <button
                        type='button'
                        onClick={() => handleDeleteMenu(menu.id)}
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

export default AdminMenus;
