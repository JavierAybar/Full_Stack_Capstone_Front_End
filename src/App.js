import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import VehicleDetails from './pages/VehicelDetails';
import store from './redux/store';

function App() {
  return (
    // <h1>Hello</h1>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/vehicles/:id" element={<VehicleDetails />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
