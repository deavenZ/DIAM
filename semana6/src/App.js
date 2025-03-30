import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Form from './pages/Form';
import Home from './pages/Home';
import Inq from './pages/Inq';
import Conf from './pages/Conf';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/inquerito" element={<Inq />} />
        <Route 
          path="/inquerito/confirmacao" 
          element={
            <ProtectedRoute>
              <Conf />
            </ProtectedRoute>
          } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
