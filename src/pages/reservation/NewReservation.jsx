/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsCalendar2Week } from 'react-icons/bs';
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
    <div className="formCont reservationCont">
      {/* Styles */}
      <style>
        {`
          // ... (styles omitted for brevity)
        `}
      </style>

      {/* Reservation Form */}
      <form className="reservationForm" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="formTitle">Test Drive</h2>
        <p className="formDesc">
          Schedule your test drive today to embark on an exhilarating experience
          with our high-performance vehicles! We will promptly confirm your reservation
          and make your supervehicle dream a reality.
        </p>
        <div className="inputCont">
          {/* City Input */}
          <input
            required
            type="text"
            name="city"
            placeholder="City"
            {...register('city', { required: true })}
            className="formInput"
          />

          {/* Date Input */}
          <div className="inputDate">
            <input
              required
              type="date"
              name="date"
              placeholder="Date"
              {...register('date', { required: true })}
              min={new Date().toISOString().split('T')[0]}
              className="formInput dateInput"
            />
            <BsCalendar2Week className="calendarIcon" />
          </div>

          {/* Vehicle Select */}
          <select
            required
            name="vehicle_id"
            {...register('vehicle_id', { required: true })}
            className="formInput formSelect"
          >
            <option className="vehicleselector" value="">
              Select a vehicle
            </option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id} className="vehicleselector">
                {vehicle.name}
              </option>
            ))}
          </select>
          {errors.vehicle_id && <span>Select Vehicle Model</span>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="reservationSubmit">
          Book Reservation
        </button>
      </form>
    </div>
  );
}

export default AddReservationPage;
