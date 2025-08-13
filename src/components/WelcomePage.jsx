import React from 'react';
import image from '../assets/mercedes-home.webp';
import Button from './Button.jsx';
import RegisterModal from './RegistrationModal.jsx';
import LoginModal from './LoginModal.jsx';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../redux/slices/authSlice'; // Ajusta la ruta si es necesario

const WelcomePage = () => {
  const [showRegisterModal, setShowRegisterModal] = React.useState(false);
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (
    <div className="min-h-dvh xl:min-h-full flex flex-col justify-center mx-auto max-w-[1100px] overflow-y-auto xl:mt-[6rem] h-dvh xl:h-full 2xl:scale-110">
      <div className="flex justify-center pb-8 overflow-x-hidden xl:mt-36 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
        <main className="mx-auto xl:pl-[3.5rem] sm:px-6 lg:px-8 lg:flex lg:items-center lg-tall:flex-col lg-tall:items-center lg-tall:text-center">
          <div className="max-w-full px-4 pt-[20%] md:pt-[10rem] pb-9 sm:text-center lg:text-left lg:pt-[90px] lg:pb-24 lg-tall:text-center">
            <h1 className="text-[36px] sm:text-[42px] font-bold tracking-tight text-gray-900 sm:text-5xl md:text-[62px] lg:text-[42px] lg-tall:text-[7rem] 2xl:text-[55px]">
              <span className="block">Rent Premium Cars</span>
              <span className="text-red-600 2xl:scale-110">easy <span className="text-gray-700">and</span> fast</span>
            </h1>
            <p className="mt-4 text-[15px] md:text-2xl text-gray-500 sm:mt-5 sm:max-w-4xl sm:mx-auto lg:mx-0 lg-tall:text-4xl 2xl:text-[1.76rem]">
              Experience the ultimate in luxury and performance. Our premium vehicle selection offers comfort, style, and reliability for any journey you have planned.
            </p>
            <div className="mt-4 sm:flex sm:justify-center lg:justify-start lg-tall:justify-center ">
              <div className="mb-2 rounded-md">
                <Button onClick={() => setShowLoginModal(true)}>Login</Button>
              </div>
              <div className="mb-2 ml-0 sm:mt-0 sm:ml-2">
                <Button onClick={() => setShowRegisterModal(true)}>Register</Button>
              </div>
              <div className="ml-0 sm:mt-0 sm:ml-2">
                <Button
                  className="p-1 text-black hover:bg-yellow-500"
                  onClick={async () => {
                    const response = await dispatch(authenticateUser({
                      email: "demo@demo.com",
                      password: "demo123" 
                    }));
                    if (!response.error) {
                      navigate('/vehicles');
                    } else {
                      alert("Demo user not available");
                    }
                  }}
                >
                  Demo user
                </Button>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col items-center w-full sm:mt-8 group">
            <img
              className="object-cover mt-[3.5rem] sm:mt-[4.5rem] md:mt-28 lg:mt-26 z-1 h-auto lg:w-[800px] md:max-w-[650px] w-[100vw] sm:max-w-[600px] scale-90 transition duration-500 ease-in-out group-hover:scale-95 2xl:scale-110"
              src={image}
              alt="Orange SUV"
            />
            <figure className="absolute z-0 rounded-full bg-red-500 w-[65vw] h-[65vw] max-w-[380px] md:max-w-[450px] md:max-h-[450px] max-h-[380px] min-w-[100px] min-h-[100px] lg:max-w-[450px] lg:max-h-[450px] scale-90 transition duration-500 ease-in-out group-hover:scale-100 2xl:scale-110" />
          </div>
        </main>
      </div>
      {/* Modals */}
      <RegisterModal open={showRegisterModal} onOpenChange={setShowRegisterModal} />
      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
    </div>
  );
};
export default WelcomePage;