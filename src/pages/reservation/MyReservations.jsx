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
function UserReservation() {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservation.reservations);
  const vehicles = useSelector((state) => state.vehicle.vehicle);
  const authUser = useSelector((state) => state.auth.user.data);
  console.log(authUser.id);

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
    return reservation.user_id === 2 && vehicleExists;
  });

  const predefinedColors = ['bg-red-500', 'bg-gray-300', 'bg-orange-400', 'bg-cyan-600'];

  // Índice para rastrear el color actual
  let colorIndex = 0;

  // Función para obtener el próximo color y actualizar el índice
  const getNextColor = () => {
    const color = predefinedColors[colorIndex];
    colorIndex = (colorIndex + 1) % predefinedColors.length;
    return color;
  };

  // Render the component.
  return (
    <div className="container p-[0px]">
      <div className="flex flex-col items-center pb-[10px] pt-[70px]">
        <h1 className="text-4xl font-extrabold LINE">Test Drives</h1>
        <p className="font-semibold text-stone-400">Here you can see all your Test Drive reservations.</p>
      </div>

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
        className="swiper_container"
      >
        {userReservations.map((reservation) => (
          <SwiperSlide key={reservation.id} style={{ width: '51%', display: 'flex' }}>
            <div className="shadow-xl card xl:w-[32rem] w-[40rem] bg-base-100  text-center mt-auto" key={reservation.id}>
              <div className="flex flex-col items-center">
                <figure className={`rounded-full w-[300px] h-[300px] flex items-center ${getNextColor()}`}><img src={getVehicleProperty(reservation.vehicle_id, 'image')} alt="car" className="xl:h-[200px] h-[250px]" /></figure>
                <div className="card-body">
                  {['Name', 'Price'].map((attr) => (
                    <div className="reservationAttr" key={attr}>
                      <h2 className="mb-0 text-2xl font-bold">
                        {attr}
                        :&nbsp;
                        {getVehicleProperty(reservation.vehicle_id, attr.toLowerCase())}
                      </h2>
                    </div>
                  ))}
                  <p className="mb-0 text-lg">
                    Date:&nbsp;
                    {reservation.date}
                  </p>
                  <p className="mb-0 text-lg ">
                    City:&nbsp;
                    {reservation.city}
                  </p>
                </div>
                <button
                  type="button"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  onClick={() => confirmDelete(reservation.id, getVehicleProperty(reservation.vehicle_id, 'name'))}
                >
                  Cancel Reservation
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="slider-controler">
          <div className="xl:w-[70px] rounded-full swiper-button-prev slider-arrow bg-lime-400 ">
            <svg className="w-[10px] h-[10px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.293 1.707 1.707 7.293a1 1 0 0 0 0 1.414l5.586 5.586A1 1 0 0 0 9 13.586V2.414a1 1 0 0 0-1.707-.707Z" />
            </svg>
          </div>
          <div className=" xl:w-[70px] rounded-full swiper-button-next slider-arrow bg-lime-400 ">
            <svg className="w-[10px] h-[10px] text-gray-800 dark:text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m2.707 14.293 5.586-5.586a1 1 0 0 0 0-1.414L2.707 1.707A1 1 0 0 0 1 2.414v11.172a1 1 0 0 0 1.707.707Z" />
            </svg>
          </div>
        </div>
      </Swiper>
    </div>
  );
}
export default UserReservation;
