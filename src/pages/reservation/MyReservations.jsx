/* eslint-disable no-nested-ternary */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import { EffectCoverflow, Navigation } from 'swiper/modules';

import { fetchReservations, deleteReservation } from '../../redux/reservation/reservSlice';
import { fetchVehicles } from '../../redux/reducers/vehiclesSlice';

/**
 * UserReservation Component
 * Displays Test Drive reservations for the authenticated user.
 */
const UserReservation = () => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservation.reservations);
  const vehicles = useSelector((state) => state.vehicle.vehicle);

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const authUser = storedUser ? storedUser.data.id : null;

  /**
   * useEffect Hook
   * Fetches reservations and vehicles when the component mounts.
   */
  useEffect(() => {
    // Fetch reservations and vehicles and set loading to false when done
    dispatch(fetchReservations())
      .then(() => dispatch(fetchVehicles()));
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
    return reservation.user_id === authUser && vehicleExists;
  });

  const predefinedColors = ['bg-red-500', 'bg-gray-300', 'bg-orange-400', 'bg-cyan-600'];

  let colorIndex = 0;

  const getNextColor = () => {
    const color = predefinedColors[colorIndex];
    colorIndex = (colorIndex + 1) % predefinedColors.length;
    return color;
  };

  return (
    <div className="container p-0">
      <div className="flex flex-col items-center pt-24 pb-10 mb-8">
        <h1 className="text-4xl font-extrabold xl:text-5xl 2xl:text-6xl LINE">TEST DRIVE</h1>
        <p className="text-xl font-semibold text-stone-400 xl:text-2xl 2xl:text-3xl">
          Here you can see all your Test Drive reservations.
        </p>
      </div>
      <div className="flex items-center justify-center min-h-[70vh] py-8 sm:min-h-[60vh] sm:py-0">
        {/* Swiper component to display user's Test Drive reservations */}
        <Swiper
          effect="coverflow"
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: '.swiper-pagination', clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable: true,
          }}
          modules={[EffectCoverflow, Navigation]}
          className="swiper_container md:h-1/5 pb-md-5"
        >
          {userReservations.map((reservation) => (
            <SwiperSlide
              key={reservation.id}
              style={{ display: 'flex', justifyContent: 'center', margin: '40px 0px' }}
              className="!mx-1 xl:!mx-10 2xl:!mx-14"
            >
              <div className="shadow-xl relative scale-100 card w-[38rem] xl:w-[48rem] 2xl:w-[56rem] bg-base-100 text-center pt-0 mt-0 hover:scale-105 transition-all duration-200 ease-in-out min-h-[360px] sm:min-h-[420px] md:min-h-[440px] xl:min-h-[480px] rounded-2xl border border-gray-200">
                <div className="flex flex-col items-center">
                  <img
                    src={getVehicleProperty(reservation.vehicle_id, 'image')}
                    alt="car"
                    className="z-10 w-auto max-w-[330px] xl:max-w-[420px] 2xl:max-w-[500px] object-contain h-[260px] xl:h-[320px] 2xl:h-[400px] mt-6"
                  />
                  <figure className={`rounded-full w-[220px] xl:w-[280px] 2xl:w-[340px] top-14 xl:top-20 2xl:top-24 h-[220px] xl:h-[280px] 2xl:h-[340px] absolute z-0 flex items-center ${getNextColor()}`} />
                  <div className="relative z-10 card-body">
                    {['Name', 'Price'].map((attr) => (
                      <div className="reservationAttr" key={attr}>
                        <h2 className="mb-0 text-2xl font-bold xl:text-3xl 2xl:text-4xl">
                          {attr}:&nbsp;{getVehicleProperty(reservation.vehicle_id, attr.toLowerCase())}
                        </h2>
                      </div>
                    ))}
                    <p className="mb-0 text-lg font-semibold xl:text-xl 2xl:text-2xl">
                      Date:&nbsp;{reservation.date}
                    </p>
                    <p className="mb-0 text-lg font-semibold xl:text-xl 2xl:text-2xl">
                      City:&nbsp;{reservation.city}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="w-[190px] h-14 focus:outline-none text-white focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xl xl:text-2xl 2xl:text-3xl px-5 py-2.5 me-2 mb-4 mt-4 bg-red-600 hover:bg-red-400 hover:scale-105 transition-all duration-200 ease-in-out"
                    onClick={() => confirmDelete(reservation.id, getVehicleProperty(reservation.vehicle_id, 'name'))}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="slider-controler">
            <div className="flex items-center justify-center transition-all duration-200 ease-in-out bg-red-500 rounded-full w-14 h-14 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 swiper-button-prev slider-arrow hover:bg-red-400 hover:scale-110">
              <svg className="text-white w-7 h-7 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.293 1.707 1.707 7.293a1 1 0 0 0 0 1.414l5.586 5.586A1 1 0 0 0 9 13.586V2.414a1 1 0 0 0-1.707-.707Z" />
              </svg>
            </div>
            <div className="flex items-center justify-center transition-all duration-200 ease-in-out bg-red-500 rounded-full w-14 h-14 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 swiper-button-next slider-arrow hover:bg-red-400 hover:scale-110">
              <svg className="text-white w-7 h-7 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m2.707 14.293 5.586-5.586a1 1 0 0 0 0-1.414L2.707 1.707A1 1 0 0 0 1 2.414v11.172a1 1 0 0 0 1.707.707Z" />
              </svg>
            </div>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default UserReservation;
