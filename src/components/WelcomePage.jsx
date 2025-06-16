import React from 'react';
import image from '../assets/mercedes-home.png';
import Button from './Button.jsx';
import RegisterModal from './RegistrationModal.jsx';

const WelcomePage = () => {
  const [showRegisterModal, setShowRegisterModal] = React.useState(false);
  

  return (
   <div className="min-h-dvh xl:min-h-full flex flex-col justify-center mx-auto max-w-[1100px] overflow-y-auto xl:mt-[6rem] h-dvh xl:h-full">
      <div className="pb-8 overflow-x-hidden sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
        <main className="mx-auto xl:pl-[3.5rem] sm:px-6 lg:px-8 lg:flex lg:items-center">
          <div className="max-w-full px-4 pt-[20%] md:pt-[10rem] pb-9 sm:text-center lg:text-left lg:pt-[90px] lg:pb-24">
            <h1 className="text-[36px] sm:text-[42px] font-bold tracking-tight text-gray-900 sm:text-5xl md:text-[62px] lg:text-[45px]">
              <span className="block ">Rent Premium Cars</span>
              <span className="block text-red-600">easy <span className="text-gray-700">and</span> fast</span>
            </h1>
            <p className="mt-4 xl:text-[15px] text-[17px] md:text-[22px] lg:text-[21px] text-gray-500 sm:mt-5 sm:max-w-4xl sm:mx-auto  lg:mx-0">
              Experience the ultimate in luxury and performance. Our premium vehicle selection offers comfort, style, and reliability for any journey you have planned.
            </p>
            <div className="mt-5 sm:flex sm:justify-center lg:justify-start ">
              
              <div className="mb-2 rounded-md">
                <Button>Login</Button>
              </div>
              <div className="ml-0 sm:mt-0 sm:ml-2">  
                  <Button onClick={() => setShowRegisterModal(true)}>Register</Button>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col items-center sm:mt-8 group">
            <img
              className=" object-cover mt-[3.5rem] sm:mt-[4.5rem] md:mt-28 lg:mt-26 z-1 h-auto lg:w-[800px] md:max-w-[650px] w-[100vw] sm:max-w-[600px] lg:scale-90  transition duration-500 ease-in-out group-hover:scale-95"
              src={image}
              alt="Orange SUV"
            />
         <figure className="absolute z-0 rounded-full bg-red-500 w-[65vw] h-[65vw] max-w-[380px] md:max-w-[450px] md:max-h-[450px] max-h-[380px] min-w-[100px] min-h-[100px] lg:max-w-[450px] lg:max-h-[450px] lg:scale-90 transition duration-500 ease-in-out group-hover:scale-100" />
          </div>
        </main>
      </div> 




    
      {/* Modals */}
     <RegisterModal open={showRegisterModal} onOpenChange={setShowRegisterModal} />
    
    </div>
    
);
};
export default WelcomePage;
