import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className="container mx-auto text-center mt-20 pt-20">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Vehicle Reservation System</h1>
      <p className="mb-8">Join us and explore a wide range of vehicles</p>
      <Link to="/login" className="btn bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2">Login</Link>
      <Link to="/register" className="btn bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2">Register</Link>
    </div>
  );
};

export default WelcomePage;
