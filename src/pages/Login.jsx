import React, { useState } from 'react';
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
      .then(() => {
        navigate('/dashboard');
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-lg">
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
          style={{ backgroundColor: '#41c219' }}
          className="w-full p-2 text-white rounded hover:bg-green-600"
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
  );
};

export default Login;
