import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import VehicleDetails from './pages/VehicelDetails';

function App() {
  return (
    // <h1>Hello</h1>
    <BrowserRouter>
      <Routes>
        <Route path="/vehicles/:id" element={<VehicleDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
