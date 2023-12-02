import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slices/authSlice';

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
