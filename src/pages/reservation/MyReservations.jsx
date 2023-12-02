/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import {
  fetchReservations,
  deleteReservation,
} from '../../redux/reservation/reservSlice';
import { fetchVehicleDetails } from '../../redux/vehicle_details/vehicleDetailsSlice';

function UserReservation() {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reserv.data);
  const vehicles = useSelector((state) => state.vehicle.data);
  const authUser = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(true);

  // Fetch reservations and vehicles on component mount
  useEffect(() => {
    setLoading(true);
    // Fetch reservations and vehicles concurrently
    dispatch(fetchReservations())
      .then(() => dispatch(fetchVehicleDetails()))
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  // Handle reservation deletion
  const handleDelete = (reservationId) => {
    dispatch(deleteReservation(reservationId));
    toast.success('Reservation Deleted!');
  };

  // Confirm reservation deletion with a confirmation prompt
  const confirmDelete = (reservationId, vehicleName) => {
    const result = window.confirm(
      `Are you sure you want to cancel the Test Drive for ${vehicleName}?`,
    );
    if (result) {
      handleDelete(reservationId);
    }
  };

  // Get vehicle name based on vehicle ID
  const getVehicleName = (vehicleId) => {
    const vehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);
    return vehicle ? vehicle.name : 'Unknown Vehicle';
  };

  // Get vehicle color based on vehicle ID
  // const getVehicleColor = (vehicleId) => {
  //   const vehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);
  //   return vehicle ? vehicle.color : "Unknown Vehicle";
  // };

  // Get vehicle image URL based on vehicle ID
  const getVehicleImage = (vehicleId) => {
    const vehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);
    return vehicle ? vehicle.image : 'Unknown Vehicle';
  };

  // Filter reservations for the current user
  const userReservations = reservations.filter((reservation) => {
    const vehicleExists = vehicles.some(
      (vehicle) => vehicle.id === reservation.vehicle_id,
    );
    return reservation.user_id === authUser.id && vehicleExists;
  });

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : userReservations.length === 0 ? (
        <div>
          <h1>Tests Drive</h1>
          <p>You dont have any Test Drive reservation yet.</p>
        </div>
      ) : (
        <div>
          <div>
            <h1>Tests Drive</h1>
            <p>Here you can see all your Test Drive reservations.</p>
          </div>

          {/* Display user reservations */}
          {userReservations.map((reservation) => (
            <div key={reservation.id}>
              {/* Reservation information */}
              <div>
                <p>
                  Model:
                  {getVehicleName(reservation.vehicle_id)}
                </p>
                <p>
                  City:
                  {reservation.city}
                </p>
                <p>
                  Date:
                  {reservation.date}
                </p>
              </div>

              {/* Vehicle image */}
              <div
                style={{
                  backgroundImage: `url(${getVehicleImage(
                    reservation.vehicle_id,
                  )})`,
                  width: '100%',
                  height: '20rem',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  margin: '-3rem 0',
                }}
              />

              {/* Button to cancel reservation */}
              <button
                type="submit"
                onClick={() => confirmDelete(
                  reservation.id,
                  getVehicleName(reservation.vehicle_id),
                )}
              >
                Cancel Reservation
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserReservation;
