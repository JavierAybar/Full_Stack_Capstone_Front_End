/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import VehicleDetails from './pages/VehicelDetails';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Logout from './pages/Logout';
import VehicleList from './pages/VehicleList';
import DeleteVehicle from './pages/DeleteVehicle';
import NewReservation from './pages/reservation/NewReservation';
import MyReservations from './pages/reservation/MyReservations';
import store from './redux/store';
import Navigation from './components/Navigation';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="d-flex">
          <Navigation />
          <Routes>
            <Route path="/vehicles" element={<VehicleList />} />
            <Route path="/vehicles/:id" element={<VehicleDetails />} />
            <Route path="/delete" element={<DeleteVehicle />} />
            <Route path="/login" element={<Login isAuthenticated />} />
            <Route path="/register" element={<Registration isAuthenticated />} />
            <Route path="/logout" element={<Logout isAuthenticated />} />
            <Route path="/new-reservation" element={<NewReservation />} />
            <Route path="/my-reservations" element={<MyReservations />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
