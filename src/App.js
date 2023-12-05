import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import VehicleDetails from './pages/VehicelDetails';
import VehicleList from './pages/VehicleList';

import store from './redux/store';
import Navigation from './components/Navigation';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/vehicles" element={<VehicleList />} />
          <Route path="/vehicles/:id" element={<VehicleDetails />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
