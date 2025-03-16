import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OrderPage from './routes/OrderPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='order' element={<OrderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
