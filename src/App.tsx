import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OrderPage from './routes/OrderPage';
import HomePage from './routes/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='order' element={<OrderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
