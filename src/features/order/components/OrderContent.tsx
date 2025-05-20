import { useEffect } from 'react';
import OrderHistoryPage from '@/pages/OrderHistoryPage';
import MenuContent from './MenuContent';
import { useNavigationStore } from '@/store/navigationStore';
import { useParams } from 'react-router-dom';
import { useKioskStore } from '@/store/kioskStore';

const OrderContent = () => {
  const { currentView } = useNavigationStore();
  const { kioskId } = useParams();
  const { kioskId: storeKioskId } = useKioskStore();

  useEffect(() => {
    const fetchKioskData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/kiosk/${kioskId}/categories`
        );
        const categoriesData = await categoriesResponse.json();
        console.log('Categories:', categoriesData);

        // Fetch menus
        const menusResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/kiosk/${kioskId}/menus`
        );
        const menusData = await menusResponse.json();
        console.log('Menus:', menusData);
      } catch (error) {
        console.error('Error fetching kiosk data:', error);
      }
    };

    if (kioskId) {
      fetchKioskData();
    }
  }, [kioskId]);

  return currentView === 'menu' ? <MenuContent /> : <OrderHistoryPage />;
};

export default OrderContent;
