import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import MenuPage from './pages/MenuPage';
import OrderHistoryPage from './pages/OrderHistoryPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <MenuPage />,
      },
      {
        path: 'order-history',
        element: <OrderHistoryPage />,
      },
    ],
  },
]);

export default router;
