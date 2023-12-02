import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import VehicleDetails from './pages/VehicelDetails';
import VehicleList from './pages/VehicleList';
import DeleteVehicle from './pages/DeleteVehicle';

import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/vehicles" element={<VehicleList />} />
          <Route path="/vehicles/:id" element={<VehicleDetails />} />
          <Route path="/delete" element={<DeleteVehicle />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
