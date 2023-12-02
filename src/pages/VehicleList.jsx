import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicles } from '../redux/reducers/vehiclesSlice';

const VehicleDetails = () => {
  const vehicles = useSelector((state) => state.vehicle.vehicle);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  return (
    <div className="details-container container pt-5">
      <h1>Latest Models</h1>
      <p>Please select a Model</p>
      {vehicles.map((car) => (
        <div className="row" key={car.id}>
          <div className="img-container col">
            <img src={car.image} alt="vehicle" className="img-fluid" />
          </div>
          <div className="vehicle-details-container col pt-5 mt-5">
            <div>
              <h2 className="h1 fw-bold">{car.name}</h2>
            </div>
            <div>
              <h2 className="h1 fw-bold">{car.description}</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VehicleDetails;
