/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import VehicleDetails from './pages/VehicelDetails';
import VehicleList from './pages/VehicleList';

import store from './redux/store';
import VehicleDetails from './pages/VehicelDetails';
import NewReservation from './pages/reservation/NewReservation';
import NewCarReservation from './pages/reservation/NewCarReservation';
import MyReservations from './pages/reservation/MyReservations';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/vehicles" element={<VehicleList />} />
          <Route path="/vehicles/:id" element={<VehicleDetails />} />
          <Route path="/new-reservation" element={<NewReservation />} />
          <Route path="/car-reservation/:vehicle_id" element={<NewCarReservation />} />
          <Route path="/my-reservations" element={<MyReservations />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
