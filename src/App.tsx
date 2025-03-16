import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OrderPage from './routes/OrderPage';
import HomePage from './routes/HomePage';
import CheckoutPage from './routes/CheckoutPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='order' element={<OrderPage />} />
        <Route path='checkout' element={<CheckoutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
