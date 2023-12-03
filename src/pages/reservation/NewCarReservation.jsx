import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { BsCalendar2Week } from 'react-icons/bs';
import { fetchVehicleDetails } from '../../redux/vehicle_details/vehicleDetailsSlice';
import { addReservation } from '../../redux/reservation/reservSlice';

function AddReservationPage() {
  const navigate = useNavigate();
  const { vehicleId } = useParams();
  const dispatch = useDispatch();

  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
  const userId = userFromLocalStorage ? userFromLocalStorage.id : null;

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(fetchVehicleDetails());
  }, [dispatch]);

  const onSubmit = (data) => {
    const formDataWithIds = {
      ...data,
      user_id: userId,
      vehicle_id: vehicleId,
    };

    dispatch(addReservation(formDataWithIds)).then(() => {
      toast.success('Reservation added successfully!');
      navigate('/my-reservations');
    });
  };

  return (
    <>
      <div className="formCont reservationCont">
        <form className="reservationForm" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="formTitle">Test Drive</h2>
          <p className="formDesc">
            Book your test drive today for a chance to experience the excitement
            of driving a supercar! We&apos;ll get in touch with you to confirm
            your reservation and make it happen.
          </p>

          <div className="inputCont">
            <input
              type="text"
              name="city"
              placeholder="City"
              ref={register('city', { required: true })}
              className="formInput"
            />
            <div className="inputDate">
              <input
                type="date"
                name="date"
                placeholder="Date"
                defaultValue={new Date().toISOString().split('T')[0]}
                ref={register('date', { required: true })}
                min={new Date().toISOString().split('T')[0]}
                className="formInput dateInput"
              />
              <BsCalendar2Week className="calendarIcon" />
            </div>
          </div>

          <div className="divider" />

          <button className="reservationSubmit" type="submit">
            Book Reservation
          </button>
        </form>
      </div>
    </>
  );
}

export default AddReservationPage;
