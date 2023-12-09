/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { SwishSpinner } from 'react-spinners-kit';
import 'swiper/css';

import { fetchReservations, deleteReservation } from '../../redux/reservation/reservSlice';
import { fetchVehicles } from '../../redux/reducers/vehiclesSlice';

/**
 * UserReservation Component
 * Displays Test Drive reservations for the authenticated user.
 */
function UserReservation() {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservation.reservations);
  const vehicles = useSelector((state) => state.vehicle.vehicle);
  const authUser = useSelector((state) => state.auth.user.data);
  console.log(authUser.id);
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
    dispatch(deleteReservation(reservationId))
      .then(() => dispatch(fetchReservations()));
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
    return reservation.user_id === 2 && vehicleExists;
  });

  // Render the component.
  return (
    <div className="myReservationsCont">
      {loading ? (
        // Display loading spinner while data is being fetched
        <SwishSpinner size={50} frontColor="#98be18" loading />
      ) : (
        // Display user's Test Drive reservations
        <div className="myReservations">
          <div className="header">
            <h1 className="title">Tests Drive</h1>
            <p className="desc">Here you can see all your Test Drive reservations.</p>
            <div className="divider" />
          </div>

          {/* Swiper component to display user's Test Drive reservations */}
          <div direction="vertical" className="reservationSwiper">
            {userReservations.map((reservation) => (
              <div className="reservationSlide" key={reservation.id}>
                <div style={{
                  border: '1px solid red', textAlign: 'center', borderRadius: '10px',
                }}
                >
                  {/* Display vehicle information for each reservation */}
                  {['Name', 'Price', 'Description'].map((attr) => (
                    <div className="reservationAttr" key={attr}>
                      <p className="attrName">
                        {attr}
                        :&nbsp;
                        {getVehicleProperty(reservation.vehicle_id, attr.toLowerCase())}
                      </p>
                    </div>
                  ))}
                  <p>
                    Date:&nbsp;
                    {reservation.date}
                  </p>
                  <p>
                    City:&nbsp;
                    {reservation.city}
                  </p>
                  <img src={getVehicleProperty(reservation.vehicle_id, 'image')} alt="car" className="xl:h-[200px] h-[250px]" />
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={() => confirmDelete(reservation.id, getVehicleProperty(reservation.vehicle_id, 'name'))}
                  >
                    Cancel Reservation
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserReservation;
