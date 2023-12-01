import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchVehicleDetails } from '../redux/vehicle_details/vehicleDetailsSlice';

const VehicleDetails = () => {
  const { id } = useParams();
  const vehicleDetails = useSelector((state) => state.vehicleDetails.details);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVehicleDetails(id));
  }, [dispatch, id]);

  return (
    <div className="details-container container pt-5">
      <div className="row">
        <div className="img-container col">
          <img src={vehicleDetails.image} alt="vehicle" className="img-fluid" />
        </div>
        <div className="vehicle-details-container col pt-5 mt-5">
          <div>
            <h2 className="h1 fw-bold">{vehicleDetails.name}</h2>
            <strong className="w-100 border-bottom d-block">
              Price:
              {vehicleDetails.price}
            </strong>
            <p>{vehicleDetails.description}</p>
          </div>
          <Link to="reserve" className="btn btn-success ps-4 pe-4">Reserve</Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
