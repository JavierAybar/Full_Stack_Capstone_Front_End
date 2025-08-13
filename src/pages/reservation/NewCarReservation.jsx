import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { useForm } from 'react-hook-form';

import { fetchVehicles } from '../../redux/reducers/vehiclesSlice';
import { addReservation } from '../../redux/reservation/reservSlice';

import image from '../../assets/car-8647797_1280.webp';

const AddReservationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(id);

  const storedUser = JSON.parse(localStorage.getItem('user'));

  const authUser = storedUser ? storedUser.data.id : null;

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  const onSubmit = (data) => {
    const formDataWithIds = {
      ...data,
      user_id: authUser,
      vehicle_id: id,
    };

    dispatch(addReservation(formDataWithIds)).then(() => {
      toast.success('Reservation added successfully!');
      navigate('/my-reservations');
    });
  };

  return (
   <div className="flex flex-col items-center w-full h-screen bg-cover" style={{ backgroundImage: `url(${image})` }}>
         <div className=" reservation flex flex-col items-center  lg:pt-[120px] pt-[80px] md:pt-[150px] w-full h-screen bg-black/30 backdrop-blur-sm">
           <h2 className="mb-6 text-4xl font-extrabold tracking-widest text-center text-white xl:text-5xl">BOOK A VEHICLE TEST-RIDE</h2>
           <hr className="w-[60%] text-white border-t-4 mb-6" />
           <p className="sm:w-[45%] w-[90%] mb-10 lg:text-[1.7rem] font-thin text-white sm:text-2xl text-center pb-16">
             There are 34 different versions of the Vespa. Today five series are
             in production: the classic manual transmission PX and the modern CVT transmission S,
             LX, GT and GTS. We have showrooms all over the globe which some include test-riding
             facilities. If you wish to find out if a test-ride is available in your area, please use
             the selector below.
           </p>
           <div className="w-full max-w-2xl p-8 mx-auto shadow-2xl bg-black/1 backdrop-blur-md rounded-xl">
           <form className="w-full login-form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="city" className="block mb-2 text-2xl font-semibold text-white xl:text-3xl">
              Select your city
            </label>
            <input
              required
              id="city"
              type="text"
              name="city"
              placeholder="City"
              {...register('city', { required: true })}
              className="w-full p-4 mb-4 text-lg text-gray-900 border border-gray-300 rounded-lg xl:text-2xl focus:outline-none focus:ring-4 focus:ring-red-400"
            />

            <label htmlFor="date" className="block mb-2 text-2xl font-semibold text-white xl:text-3xl">
              Select a date
            </label>
             <div className="relative mb-4">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
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
                className="w-full p-4 text-lg text-gray-900 border rounded-lg xl:text-2xl ps-12 focus:outline-none focus:ring-4 focus:ring-red-400"
              />
            </div>

             <button
              type="submit"
              className="w-full px-6 py-3 mt-4 text-2xl font-bold text-white transition-all duration-200 bg-red-600 rounded-lg hover:bg-red-500 hover:scale-105 xl:text-3xl"
            >
              Book Reservation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReservationPage;
