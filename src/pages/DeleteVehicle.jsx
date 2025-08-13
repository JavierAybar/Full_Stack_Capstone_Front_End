import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVehicle, fetchVehicles } from '../redux/reducers/vehiclesSlice';

const DeleteVehicle = () => {
  const { vehicle: vehicles, isLoading } = useSelector((state) => state.vehicle);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.classList.add('enable-scrolling');
    dispatch(fetchVehicles());
    return () => {
      document.body.classList.remove('enable-scrolling');
    };
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <section className="flex justify-center w-full px-4 py-12 mt-20 xl:py-20">
      <div className="relative w-full max-w-5xl overflow-x-auto scale-105 bg-white border border-gray-200 shadow-lg xl:max-w-6xl rounded-xl xl:scale-110">
        <table className="w-full font-sans text-lg text-left xl:text-xl 2xl:text-2xl rtl:text-right">
          <thead>
            <tr className="bg-gradient-to-r from-red-500 to-red-400">
              <th scope="col" className="px-8 py-6 text-xl font-bold text-center text-white xl:text-2xl rounded-tl-xl">
                Product
              </th>
              <th scope="col" className="px-8 py-6 text-xl font-bold text-center text-white xl:text-2xl">
                Model
              </th>
              <th scope="col" className="px-8 py-6 text-xl font-bold text-center text-white xl:text-2xl rounded-tr-xl">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((car) => (
              <tr
                key={car.id}
                className="transition-colors hover:bg-red-50"
              >
                <td className="flex justify-center px-0 py-6">
                  <img
                    className="object-cover ml-4 transition-transform duration-200 rounded-lg shadow w-36 h-36 xl:w-44 xl:h-44 hover:scale-105"
                    src={car.image}
                    alt={car.name}
                  />
                </td>
                <td className="px-8 py-6 text-center align-middle">
                  <span className="text-2xl font-semibold text-gray-800 transition-colors duration-200 xl:text-3xl hover:text-red-600">
                    {car.name}
                  </span>
                </td>
                <td className="px-8 py-6 text-center align-middle">
                  <button
                    type="button"
                    className="px-16 py-3 text-lg font-semibold text-white transition-all duration-200 bg-red-600 rounded-lg shadow xl:text-xl hover:bg-red-500 focus:ring-4 focus:ring-red-300 focus:outline-none hover:scale-105"
                    onClick={() => dispatch(deleteVehicle(car.id))}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DeleteVehicle;
