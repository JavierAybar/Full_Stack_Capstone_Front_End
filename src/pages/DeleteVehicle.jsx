import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVehicle, fetchVehicles } from '../redux/reducers/vehiclesSlice';

const DeleteVehicle = () => {
  const vehicles = useSelector((state) => state.vehicle.vehicle);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  return (
    <div className="details-container container pt-5">
      {vehicles.length > 0 ? (
        vehicles.map((car) => (
          <div key={car.id}>
            <h1>{car.name}</h1>
            <button type="button" onClick={() => dispatch(deleteVehicle(car.id))}>Delete</button>
          </div>
        ))
      ) : (
        <div>No vehicles to display</div>
      )}
    </div>
  );
};

export default DeleteVehicle;
