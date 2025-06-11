import React from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/mercedes-home.png';
import Button from './Button.jsx';

const WelcomePage = () => (
   <div className="min-h-dvh xl:min-h-full flex flex-col justify-center mx-auto max-w-[1100px] overflow-y-auto xl:mt-[6rem]">
      <div className="pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
        <main className="px-4 mx-auto sm:px-6 lg:px-8 lg:flex lg:items-center">
          <div className="max-w-full px-4 pt-[20%] md:pt-[10rem] pb-9 sm:text-center lg:text-left lg:pt-[90px] lg:pb-24">
            <h1 className="text-[36px] sm:text-[42px] font-bold tracking-tight text-gray-900 sm:text-5xl md:text-[62px] lg:text-[45px]">
              <span className="block ">Rent Premium Cars</span>
              <span className="block text-gray-700">easy and fast</span>
            </h1>
            <p className="mt-4 xl:text-[15px] text-[17px] md:text-[22px] lg:text-[21px] text-gray-500 sm:mt-5 sm:max-w-4xl sm:mx-auto  lg:mx-0">
              Experience the ultimate in luxury and performance. Our premium vehicle selection offers comfort, style, and reliability for any journey you have planned.
            </p>
            <div className="mt-5 sm:flex sm:justify-center lg:justify-start ">
              <div className="mb-2 rounded-md">
                <Link to="/login"
                >
                  <Button>Login</Button>
                </Link>
              </div>
              <div className="ml-0 sm:mt-0 sm:ml-2">  
                <Link to="/register"
                >
                  <Button>Register</Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col items-center sm:mt-8">
            <img
              className=" object-cover mt-[3.5rem] sm:mt-[4.5rem] md:mt-28 lg:mt-26 z-1 h-auto lg:w-[800px] md:max-w-[650px] w-[100vw] sm:max-w-[600px]"
              src={image}
              alt="Orange SUV"
            />
         <figure className="absolute z-0 rounded-full bg-red-500 w-[65vw] h-[65vw] max-w-[380px] md:max-w-[450px] md:max-h-[450px] max-h-[380px] min-w-[100px] min-h-[100px] lg:max-w-[450px] lg:max-h-[450px]" />
          </div>
        </main>
      </div> 
    </div>
);



// style={{ backgroundImage: `url(${image})` }}
// flex flex-col items-center 2xl:pt-[80px] lg:pt-[160px] pt-[130px]
export default WelcomePage;
