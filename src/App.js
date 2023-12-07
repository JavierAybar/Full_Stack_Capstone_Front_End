/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';

import store from './redux/store';
import NewReservation from './pages/reservation/NewReservation';
import NewCarReservation from './pages/reservation/NewCarReservation';
// import MyReservations from './pages/reservation/MyReservations';

function App() {
  return (
    <Provider store={store}>
      <NewReservation />
      <NewCarReservation />
      {/* <MyReservations /> */}
    </Provider>
  );
}

export default App;
