import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import VehicleDetails from './pages/VehicelDetails';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Logout from './pages/Logout';
import store from './redux/store';

function App() {
  return (
    // <h1>Hello</h1>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/vehicles/:id" element={<VehicleDetails />} />
          <Route path="/login" element={<Login isAuthenticated />} />
          <Route path="/register" element={<Registration isAuthenticated />} />
          <Route path="/logout" element={<Logout isAuthenticated />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
