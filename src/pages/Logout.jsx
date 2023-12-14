import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/slices/authSlice';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logoutUser())
      .then(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        // Redirect to the Welcome page after successful logout
        navigate('/');
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  }, [dispatch, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="p-4 text-lg font-semibold bg-white rounded shadow">Logging out...</p>
    </div>
  );
};

export default Logout;
