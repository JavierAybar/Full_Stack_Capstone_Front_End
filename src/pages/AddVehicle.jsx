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
    <div className="container vh-100 d-flex flex-row align-items-center vw-100 justify-content-center p-2">
      <div className="row vw-100">
        <div className="col-md-6 mx-auto">
          <div className="card shadow">
            <div className="card-header">
              <h4>Add Vehicle</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-3">
                  <label htmlFor="name">
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
                  <label htmlFor="image">
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
                  <label htmlFor="price">
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
                  <label htmlFor="description">
                    <textarea
                      id="description"
                      className="form-control"
                      placeholder="Enter Description"
                      {...register('description', { required: true })}
                    />
                  </label>
                  {errors.description && <span className="text-danger">This field is required</span>}
                </div>
                <button type="submit" className="btn btn-outline-success ">Add Vehicle</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;
