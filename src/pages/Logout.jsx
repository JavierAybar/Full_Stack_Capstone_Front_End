import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slices/authSlice';

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="p-4 text-lg font-semibold bg-white rounded shadow">Logged out</p>
    </div>
  );
};

export default Logout;
