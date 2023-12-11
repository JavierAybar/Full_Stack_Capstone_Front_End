import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { fetchVehicleDetails } from '../redux/vehicle_details/vehicleDetailsSlice';

const VehicleDetails = () => {
  const { id } = useParams();
  const vehicleDetails = useSelector((state) => state.vehicleDetails.details);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVehicleDetails(id));
  }, [dispatch, id]);

  return (
    <div className="container pt-5 details-container">
      <div className="row">
        <div className="img-container col">
          <img src={vehicleDetails.image} alt="vehicle" className="img-fluid" />
        </div>
        <div className="pt-5 mt-5 vehicle-details-container col">
          <div>
            <h2 className="h1 fw-bold">{vehicleDetails.name}</h2>
            <strong className="w-100 border-bottom d-block">
              Price:
              {vehicleDetails.price}
            </strong>
            <p>{vehicleDetails.description}</p>
          </div>
          <NavLink className="btn btn-success ps-4 pe-4" to={`/new-car-reservation/${id}`}>Reserve</NavLink>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
