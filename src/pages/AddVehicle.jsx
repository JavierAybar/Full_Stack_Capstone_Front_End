import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { addNewVehicle } from '../redux/reducers/addVehicleSlice';

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
    <div className="container pt-5 mt-5 d-flex  align-items-center  justify-content-center p-2">
      <div className="row mt-5 vw-100">
        <div className="col-md-6 mt-5 mx-auto">
          <div className="card shadow">
            <h2 className="text-2xl font-bold p-6 mt-1 mb-1">Add Vehicle</h2>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-3">
                  <label className="w-100" htmlFor="name">
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      placeholder="Enter Modle Name"
                      {...register('name', { required: true })}
                    />
                  </label>
                  {errors.name && <span className="text-danger">This field is required</span>}
                </div>
                <div className="form-group mb-3">
                  <label className="w-100" htmlFor="image">
                    <input
                      type="text"
                      id="image"
                      className="form-control"
                      placeholder="Enter Image URL"
                      {...register('image', { required: true })}
                    />
                  </label>
                  {errors.image && <span className="text-danger">This field is required</span>}
                </div>
                <div className="form-group mb-3">
                  <label className="w-100" htmlFor="price">
                    <input
                      type="number"
                      id="price"
                      className="form-control"
                      placeholder="Enter Price"
                      {...register('price', { required: true })}
                    />
                  </label>
                  {errors.price && <span className="text-danger">This field is required</span>}
                </div>
                <div className="form-group mb-3">
                  <label className="w-100" htmlFor="description">
                    <textarea
                      id="description"
                      className="form-control"
                      placeholder="Enter Description"
                      {...register('description', { required: true })}
                    />
                  </label>
                  {errors.description && <span className="text-danger">This field is required</span>}
                </div>
                <button type="submit" style={{ backgroundColor: '#41c219' }} className="w-full p-2 text-white rounded hover:bg-green-600">Add Vehicle</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;
