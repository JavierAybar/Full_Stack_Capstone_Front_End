import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import { fetchVehicleDetails } from '../redux/vehicle_details/vehicleDetailsSlice';
import styles from './VehicleDetails.module.css';

const VehicleDetails = () => {
  const { id } = useParams();
  const vehicleDetails = useSelector((state) => state.vehicleDetails.details);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVehicleDetails(id));
  }, [dispatch, id]);

  return (
    <div className="container pt-5">
      <div className={styles.detailsContainer}>
        <div className={styles.imageContainer}>
          <img src={vehicleDetails.image} alt="vehicle" className="img-fluid" />
        </div>
        <div className={styles.vehicleDetailsContainer}>
          <div className={styles.detailsBox}>
            <h2 className="h1 fw-bold text-align-right">{vehicleDetails.name}</h2>
            <strong className="w-100 border-bottom d-block">
              Price:
              $
              {vehicleDetails.price}
            </strong>
            <p>{vehicleDetails.description}</p>
          </div>
          <Link to={`/new-car-reservation/${id}`} className={`btn ps-4 pe-4 ${styles.btnCust}`}>
            Reserve
            {' '}
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
