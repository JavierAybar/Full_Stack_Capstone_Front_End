import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVehicle, fetchVehicles } from '../redux/reducers/vehiclesSlice';

const DeleteVehicle = () => {
  const { vehicle: vehicles, isLoading } = useSelector((state) => state.vehicle);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <section className="flex justify-evenly mt-20 mx-2">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full lg:w-[700px] sm:w-full">
        <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-3 hidden sm:flex">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3  text-[16px]">
                Product
              </th>
              <th scope="col" className="px-6 py-3 text-[16px]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((car) => (
              <tr className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={car.id}>
                <td className="px-0 py-4 justify-center hidden sm:flex">
                  <img className="w-16 md:w-44 max-w-full max-h-full" src={car.image} alt={car.name} />
                </td>
                <td className="px-6 py-4">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{car.name}</h5>
                </td>
                <td className="px-6 py-4">
                  <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => dispatch(deleteVehicle(car.id))}>Delete</button>

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
