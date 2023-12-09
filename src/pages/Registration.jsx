import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/slices/authSlice';
import Spinner from '../components/Spinner';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const validateInput = () => {
    if (!username || !email || !password || !passwordConfirmation) {
      alert('Please enter all required fields');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address');
      return false;
    }
    if (password !== passwordConfirmation) {
      alert('Password and password confirmation do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInput()) return;
    dispatch(registerUser({
      username, email, password, passwordConfirmation,
    }))
      .then(() => {
        navigate('/login');
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Registration</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:shadow-outline"
        />
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
        <input
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="Confirm Password"
          className="w-full p-2 mb-6 border rounded focus:outline-none focus:shadow-outline"
        />
        <button type="submit" disabled={loading} style={{ backgroundColor: '#41c219' }} className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-700">
          Register
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
  );
};

export default Registration;
