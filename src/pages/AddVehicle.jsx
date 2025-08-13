import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { addNewVehicle } from '../redux/reducers/addVehicleSlice';
import image from '../assets/reserve_car.webp';

const AddVehicle = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(addNewVehicle(data));
    toast.success('Vehicle Added Successfully');
    navigate('/vehicles', { replace: true });
  };

  return (
    <div
      className="flex items-center justify-center w-full h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="w-full max-w-2xl p-8 mx-auto shadow-2xl rounded-xl bg-black/30 backdrop-blur-md">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <h2 className="mb-6 text-4xl font-extrabold text-center text-white xl:text-5xl">Add Vehicle</h2>
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-2xl font-semibold text-white xl:text-3xl">
              Model Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-3 text-lg text-gray-900 border border-gray-300 rounded-lg xl:text-2xl focus:outline-none focus:ring-4 focus:ring-red-400"
              placeholder="Enter Model Name"
              {...register('name', { required: true })}
            />
            {errors.name && <span className="text-lg text-red-400">This field is required</span>}
          </div>
          <div className="mb-5">
            <label htmlFor="image" className="block mb-2 text-2xl font-semibold text-white xl:text-3xl">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              className="w-full p-3 text-lg text-gray-900 border border-gray-300 rounded-lg xl:text-2xl focus:outline-none focus:ring-4 focus:ring-red-400"
              placeholder="Enter Image URL"
              {...register('image', { required: true })}
            />
            {errors.image && <span className="text-lg text-red-400">This field is required</span>}
          </div>
          <div className="mb-5">
            <label htmlFor="price" className="block mb-2 text-2xl font-semibold text-white xl:text-3xl">
              Price
            </label>
            <input
              type="number"
              id="price"
              className="w-full p-3 text-lg text-gray-900 border border-gray-300 rounded-lg xl:text-2xl focus:outline-none focus:ring-4 focus:ring-red-400"
              placeholder="Enter Price"
              {...register('price', { required: true })}
            />
            {errors.price && <span className="text-lg text-red-400">This field is required</span>}
          </div>
          <div className="mb-5">
            <label htmlFor="description" className="block mb-2 text-2xl font-semibold text-white xl:text-3xl">
              Description
            </label>
            <textarea
              id="description"
              className="w-full p-3 text-lg text-gray-900 border border-gray-300 rounded-lg resize-none xl:text-2xl focus:outline-none focus:ring-4 focus:ring-red-400"
              placeholder="Enter Description"
              {...register('description', { required: true })}
              rows={3}
            />
            {errors.description && <span className="text-lg text-red-400">This field is required</span>}
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 mt-4 text-2xl font-bold text-white transition-all duration-200 bg-red-600 rounded-lg hover:bg-red-500 hover:scale-105 xl:text-3xl"
          >
            Add Vehicle
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
