import { useParams } from 'react-router-dom';
import VoiceTester from '../components/VoiceTester';

const OrderPage = () => {
  const { storeId, tableNumber } = useParams();

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <div className='max-w-4xl mx-auto'>
        <VoiceTester />
      </div>
    </div>
  );
};

export default OrderPage;
