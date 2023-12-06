import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import VehicleDetails from './pages/VehicelDetails';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Logout from './pages/Logout';
import VehicleList from './pages/VehicleList';
import AddVehicle from './pages/AddVehicle';
import DeleteVehicle from './pages/DeleteVehicle';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/vehicles" element={<VehicleList />} />
          <Route path="/vehicles/:id" element={<VehicleDetails />} />
          <Route path="/new-vehicle" element={<AddVehicle />} />
          <Route path="/delete" element={<DeleteVehicle />} />
          <Route path="/login" element={<Login isAuthenticated />} />
          <Route path="/register" element={<Registration isAuthenticated />} />
          <Route path="/logout" element={<Logout isAuthenticated />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
