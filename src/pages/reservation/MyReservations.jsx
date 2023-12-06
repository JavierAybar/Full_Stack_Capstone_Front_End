/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { SwishSpinner } from 'react-spinners-kit';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { fetchReservations, deleteReservation } from '../../redux/reservation/reservSlice';
import { fetchVehicles } from '../../redux/reducers/vehiclesSlice';

/**
 * UserReservation Component
 * Displays Test Drive reservations for the authenticated user.
 */
function UserReservation() {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reserv.data);
  const vehicles = useSelector((state) => state.vehicle.data);
  const authUser = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);

  /**
   * useEffect Hook
   * Fetches reservations and vehicles when the component mounts.
   */
  useEffect(() => {
    setLoading(true);
    // Fetch reservations and vehicles and set loading to false when done
    dispatch(fetchReservations())
      .then(() => dispatch(fetchVehicles()))
      .finally(() => setLoading(false));
  }, [dispatch]);

  /**
   * Handles reservation deletion and displays success toast.
   * @param {number} reservationId - ID of the reservation to be deleted.
   */
  const handleDelete = (reservationId) => {
    dispatch(deleteReservation(reservationId));
    toast.success('Reservation Deleted!');
  };

  /**
   * Displays a confirmation dialog before canceling a reservation.
   * @param {number} reservationId - ID of the reservation to be canceled.
   * @param {string} vehicleName - Name of the vehicle associated with the reservation.
   */
  const confirmDelete = (reservationId, vehicleName) => {
    if (window.confirm(`Are you sure you want to cancel the Test Drive for ${vehicleName}?`)) {
      handleDelete(reservationId);
    }
  };

  /**
   * Gets a specific property of a vehicle by ID.
   * @param {number} vehicleId - ID of the vehicle.
   * @param {string} property - Property to retrieve (e.g., 'name', 'color').
   * @returns {string} - Value of the specified property or 'Unknown Vehicle' if not found.
   */
  const getVehicleProperty = (vehicleId, property) => vehicles.find((vehicle) => vehicle.id === vehicleId)?.[property] || 'Unknown Vehicle';

  // Filter reservations for the authenticated user and existing vehicles.
  const userReservations = reservations.filter((reservation) => {
    const vehicleExists = vehicles.some((vehicle) => vehicle.id === reservation.vehicle_id);
    return reservation.user_id === authUser.id && vehicleExists;
  });

  // Render the component.
  return (
    <div className="myReservationsCont">
      {loading ? (
        // Display loading spinner while data is being fetched
        <SwishSpinner size="50" frontColor="#98be18" loading />
      ) : userReservations.length === 0 ? (
        // Display message if the user has no reservations
        <div className="reservationsEmpty">
          <h1>Tests Drive</h1>
          <p>You dont have any Test Drive reservations yet.</p>
        </div>
      ) : (
        // Display user's Test Drive reservations
        <div className="myReservations">
          <div className="header">
            <h1 className="title">Tests Drive</h1>
            <p className="desc">Here you can see all your Test Drive reservations.</p>
            <div className="divider" />
          </div>

          {/* Swiper component to display user's Test Drive reservations */}
          <Swiper direction="vertical" slidesPerView={1} spaceBetween={30} className="reservationSwiper">
            {userReservations.map((reservation) => (
              <SwiperSlide className="reservationSlide" key={reservation.id}>
                <div className="reservationInfo">
                  {/* Display vehicle information for each reservation */}
                  {['Model', 'City', 'Date'].map((attr) => (
                    <div className="reservationAttr" key={attr}>
                      <p className="attrName">
                        {attr}
                        :
                      </p>
                      <p>{getVehicleProperty(reservation.vehicle_id, attr.toLowerCase())}</p>
                    </div>
                  ))}
                </div>
                {/* Display vehicle image for each reservation */}
                <div className={`vehicleImg vehicleImg${reservation.vehicle_id}`} />
                {/* Style for vehicle image and additional information */}
                <style>
                  {`
                    .vehicleImg${reservation.vehicle_id} {
                      background-image: url(${getVehicleProperty(reservation.vehicle_id, 'semi_front_image')});
                      width: 100%;
                      max-width: 20rem;
                      background-size: contain;
                      background-repeat: no-repeat;
                      background-position: center;
                      height: 20rem;
                      margin: -3rem 0;
                    }

                    .vehicleImg${reservation.vehicle_id}::before {
                      background-color: ${getVehicleProperty(reservation.vehicle_id, 'color')};
                    }
                  `}
                </style>
                {/* Button to cancel reservation */}
                <button
                  type="submit"
                  className="cancelReservationBtn"
                  onClick={() => confirmDelete(reservation.id, getVehicleProperty(reservation.vehicle_id, 'name'))}
                >
                  Cancel Reservation
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default UserReservation;
