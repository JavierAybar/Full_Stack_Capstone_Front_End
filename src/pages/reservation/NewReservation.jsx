import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { BsCalendar2Week } from 'react-icons/bs';
import { fetchVehicleDetails } from '../../redux/vehicle_details/vehicleDetailsSlice';
import { addReservation } from '../../redux/reservation/reservSlice';

function AddReservationPage() {
  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const vehicles = useSelector((state) => state.vehicle.data);

  // Get user ID from localStorage
  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
  const userId = userFromLocalStorage ? userFromLocalStorage.id : null;

  // Form handling with react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      city: '',
      date: '',
      user_id: userId,
      vehicle_id: '',
    },
  });

  // Fetch vehicles on component mount
  useEffect(() => {
    dispatch(fetchVehicleDetails()); // Dispatch action to fetch vehicle data
  }, [dispatch]);

  // Form submission
  const onSubmit = (formData) => {
    // Dispatch addReservation action
    dispatch(addReservation(formData)).then(() => {
      // Reset form fields on successful reservation
      setValue('city', '');
      setValue('date', '');
      setValue('vehicle_id', '');
      // Show a success toast message
      toast.success('Reservation added successfully!');
      // Redirect to "My Reservations"
      navigate('/my-reservations');
    });
  };

  return (
    <div>
      {/* Reservation Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Form Heading */}
        <h2>Test Drive</h2>
        {/* Form Description */}
        <p>
          Schedule a test drive today to immerse yourself in the exhilarating
          experience of driving a high-performance vehicle! We&apos;ll reach out to you
          promptly to confirm your reservation and bring your dream drive to life.
        </p>
        {/* Form Inputs */}
        <div>
          {/* City Input */}
          <input
            required
            type="text"
            name="city"
            placeholder="City"
            ref={register('city', { required: true })}
          />
          {/* Date Input with Calendar Icon */}
          <div>
            <input
              required
              type="date"
              name="date"
              placeholder="Date"
              ref={register('date', { required: true })}
              min={new Date().toISOString().split('T')[0]}
            />
            <BsCalendar2Week />
          </div>
          {/* Vehicle Selection Dropdown */}
          <select
            required
            name="vehicle_id"
            ref={register('vehicle_id', { required: true })}
          >
            <option value="">Select a vehicle</option>
            {/* Mapping through vehicles to populate dropdown options */}
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.name}
              </option>
            ))}
          </select>
          {/* Error message for vehicle selection */}
          {errors.vehicle_id && <span>Select Vehicle Model</span>}
        </div>
        {/* Submit Button */}
        <button type="submit">Book Reservation</button>
      </form>
    </div>
  );
}

export default AddReservationPage;
