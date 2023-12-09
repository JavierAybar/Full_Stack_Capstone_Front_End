/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
import { fetchVehicles } from '../../redux/reducers/vehiclesSlice';
import { addReservation } from '../../redux/reservation/reservSlice';

function AddReservationPage() {
  // Hooks and state
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const vehicles = useSelector((state) => state.vehicle.vehicle);
  const authUser = useSelector((state) => state.auth.user.data);

  // Form setup using react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      city: '',
      date: '',
      user_id: authUser.id,
      vehicle_id: '',
    },
  });

  // Fetch vehicles on component mount
  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  // Form submission handler
  const onSubmit = (formData) => {
    dispatch(addReservation(formData)).then(() => {
      // Reservation added successfully, reset form fields
      setValue('city', '');
      setValue('date', '');
      setValue('vehicle_id', '');
      // Show a success toast message
      toast.success('Reservation added successfully!');
      // Redirect to "My Reservations"
      // navigate('/my-reservations');
    });
  };

  // JSX for the component
  return (
    <div>
      <h2 className="formTitle">Test Drive</h2>
      <p className="formDesc">
        Schedule your test drive today to embark on an exhilarating experience
        with our high-performance vehicles! We will promptly confirm your reservation
        and make your supervehicle dream a reality.
      </p>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
        {/* City Input */}
        <label htmlFor="city" className="block mb-1 text-sm font-medium text-gray-900 dark:text-back">
          Select your city
        </label>
        <input
          required
          id="city"
          type="text"
          name="city"
          placeholder="City"
          {...register('city', { required: true })}
          className="pl-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        {/* Date Input */}
        <label htmlFor="date" className="block mb-1 text-sm font-medium text-gray-900 dark:text-back">
          Select your date
        </label>
        <div className="relative max-w-sm">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input
            required
            id="date"
            type="date"
            name="date"
            placeholder="Select date"
            {...register('date', { required: true })}
            min={new Date().toISOString().split('T')[0]}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* Vehicle Select */}

        <label htmlFor="vehicles" className="block mt-1 mb-1 text-sm font-medium text-gray-900 dark:text-back">
          Select your vehicle
        </label>
        <select
          id="vehicles"
          required
          name="vehicle_id"
          {...register('vehicle_id', { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">
            Select a vehicle
          </option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id} className="vehicleselector">
              {vehicle.name}
            </option>
          ))}
        </select>
        {errors.vehicle_id && <span>Select Vehicle Model</span>}

        {/* Submit Button */}
        <button type="submit" className="text-white bg-gradient-to-r from-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Book Reservation
        </button>
      </form>
    </div>
  );
}

export default AddReservationPage;
