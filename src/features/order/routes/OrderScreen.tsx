// src/features/order/routes/OrderScreen.tsx

import { useParams } from 'react-router-dom'; // Import useParams

const OrderScreen = () => {
  // Get the categoryId from the URL, if it exists
  const { categoryId } = useParams<{ categoryId?: string }>();

  // TODO:
  // 1. Use the categoryId to fetch or filter menu items for that category.
  // 2. Display the menu items.

  return (
    // Remove the outer div with 'flex h-screen' and the NavigationBar import/render
    <div className='p-4'>
      {' '}
      {/* Add some padding */}
      <h1 className='text-2xl font-bold mb-4'>Order Screen</h1>
      {categoryId ? (
        <p>Displaying menus for Category ID: {categoryId}</p>
      ) : (
        <p>
          Welcome to the Order Screen! Please select a category from the left.
        </p>
      )}
      {/* Placeholder for menu items list */}
      <div className='mt-4 border border-dashed border-gray-400 p-4 min-h-[200px]'>
        Menu items for category '{categoryId || 'None Selected'}' will appear
        here.
      </div>
    </div>
  );
};

export default OrderScreen;
