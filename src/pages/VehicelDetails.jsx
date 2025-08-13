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
    <div className="container flex items-center justify-center min-h-screen py-12">
      <div className={`${styles.detailsContainer} flex flex-col md:flex-row bg-white rounded-2xl shadow-xl p-8 gap-8 w-full max-w-7xl xl:max-w-[1400px]`}>
        <div className={`${styles.imageContainer} flex justify-center items-center md:w-1/2`}>
          <img
            src={vehicleDetails.image}
            alt="vehicle"
            className="object-contain rounded-xl shadow-lg w-full max-w-[900px] h-[280px] xl:max-w-[1200px] xl:h-[340px] transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className={`${styles.vehicleDetailsContainer} flex flex-col justify-center md:w-1/2`}>
          <div className={`${styles.detailsBox} mb-8`}>
            <h2 className="mb-4 text-4xl font-extrabold text-gray-900 xl:text-5xl">{vehicleDetails.name}</h2>
            <strong className="block w-full pb-2 mb-4 text-2xl text-red-600 border-b xl:text-3xl">
              Price: ${vehicleDetails.price}
            </strong>
            <p className="text-lg text-gray-700 xl:text-xl">{vehicleDetails.description}</p>
          </div>
          <Link
            to={`/new-car-reservation/${id}`}
            className="flex items-center justify-center w-full gap-3 px-8 py-4 text-2xl font-bold text-white transition-all duration-200 bg-red-600 rounded-lg shadow md:w-auto xl:text-3xl hover:bg-red-500 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300"
          >
            Reserve
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
