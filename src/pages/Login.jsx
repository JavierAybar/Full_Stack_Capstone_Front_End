import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../redux/slices/authSlice';
import Spinner from '../components/Spinner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const validateInput = () => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address');
      return false;
    }
    return true;
  };
const handleSubmit = (e) => {
  e.preventDefault();
  if (!validateInput()) return;
  dispatch(authenticateUser({ email, password }))
    .then((response) => {
      if (response.error) {
        console.error('Error response:', response.error);
        setEmail('');
        setPassword('');
      } else {
        navigate('/vehicles');
      }
    })
    .catch((error) => {
      console.error('Error in handleSubmit:', error);
    });
};
  return (
    <div className="container pt-5 h-1/2 mt-5 d-flex  align-items-center  justify-content-center p-2">
      <div className="col-md-12 row mt-5 pt-5">
        <div className="col-md-6 mt-5 mx-auto">
          <form onSubmit={handleSubmit} className="p-6 mt-5 bg-white rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 mb-4 border rounded focus:outline-none focus:shadow-outline"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2 mb-4 border rounded focus:outline-none focus:shadow-outline"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full p-2 text-white bg-[#41c219] hover:bg-green-600 rounded"
              >
              Login
            </button>

            {loading && <Spinner />}
            {error && (
              <p className="mt-4 text-red-500">
                Error:
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
