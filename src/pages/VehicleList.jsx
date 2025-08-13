import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagramSquare, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
import { fetchVehicles } from '../redux/reducers/vehiclesSlice';

const VehicleDetails = () => {
  const vehicles = useSelector((state) => state.vehicle.vehicle);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  const predefinedColors = ['bg-red-500', 'bg-gray-300', 'bg-orange-400', 'bg-cyan-600'];
  let colorIndex = 0;
  const getNextColor = () => {
    const color = predefinedColors[colorIndex];
    colorIndex = (colorIndex + 1) % predefinedColors.length;
    return color;
  };

  return (
    <div className="container p-0">
      <div className="flex flex-col items-center pt-24 pb-10 mb-8">
        <h1 className="text-4xl font-extrabold xl:text-5xl 2xl:text-6xl LINE">LATEST MODELS</h1>
        <p className="text-xl font-semibold text-stone-400 xl:text-2xl 2xl:text-3xl">Please select a Model</p>
      </div>

      <div className="flex items-center justify-center min-h-[70vh] py-8 sm:min-h-[60vh] sm:py-0">
        <Swiper
          effect="coverflow"
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: '.swiper-pagination', clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable: true,
          }}
          modules={[EffectCoverflow, Navigation]}
          className="swiper_container md:h-1/5 pb-md-5"
        >
          {vehicles.map((car) => (
            <SwiperSlide
              key={car.id}
              style={{ display: 'flex', justifyContent: 'center', margin: '40px 0px' }}
              className="!mx-1 xl:!mx-10 2xl:!mx-14"
            >
              <div className="shadow-xl relative scale-100 card w-[38rem] xl:w-[48rem] 2xl:w-[56rem] bg-base-100 text-center pt-0 mt-0 hover:scale-105 transition-all duration-200 ease-in-out min-h-[360px] sm:min-h-[420px] md:min-h-[440px] xl:min-h-[480px] rounded-2xl border border-gray-200">
                <Link className="flex flex-col items-center" to={`/vehicles/${car.id}`}>
                  <img
                    src={car.image}
                    alt={car.name}
                    className="z-10 w-auto max-w-[330px] xl:max-w-[420px] 2xl:max-w-[500px] object-contain h-[260px] xl:h-[320px] 2xl:h-[400px] mt-6"
                  />
                  <figure className={`rounded-full w-[220px] xl:w-[280px] 2xl:w-[340px] top-14 xl:top-20 2xl:top-24 h-[220px] xl:h-[280px] 2xl:h-[340px] absolute z-0 flex items-center ${getNextColor()}`} />
                  <div className="relative z-10 card-body">
                    <h2 className="mb-0 text-2xl font-bold xl:text-3xl 2xl:text-4xl">{car.name}</h2>
                    <p className="mb-2 text-xl tracking-widest xl:text-2xl 2xl:text-3xl text-stone-400">..............................</p>
                    <p className="mb-4 text-base font-semibold xl:text-lg 2xl:text-xl text-stone-400">{car.description}</p>
                    <div className="flex justify-center gap-6 xl:gap-8 2xl:gap-10 card-actions">
                      <FontAwesomeIcon className="text-2xl xl:text-3xl 2xl:text-4xl text-stone-400" icon={faFacebookSquare} />
                      <FontAwesomeIcon className="text-2xl xl:text-3xl 2xl:text-4xl text-stone-400" icon={faInstagramSquare} />
                      <FontAwesomeIcon className="text-2xl xl:text-3xl 2xl:text-4xl text-stone-400" icon={faSquareXTwitter} />
                    </div>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
          <div className="slider-controler">
            <div className="flex items-center justify-center transition-all duration-200 ease-in-out bg-red-500 rounded-full w-14 h-14 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 swiper-button-prev slider-arrow hover:bg-red-400 hover:scale-110">
              <svg className="text-white w-7 h-7 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.293 1.707 1.707 7.293a1 1 0 0 0 0 1.414l5.586 5.586A1 1 0 0 0 9 13.586V2.414a1 1 0 0 0-1.707-.707Z" />
              </svg>
            </div>
            <div className="flex items-center justify-center transition-all duration-200 ease-in-out bg-red-500 rounded-full w-14 h-14 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 swiper-button-next slider-arrow hover:bg-red-400 hover:scale-110">
              <svg className="text-white w-7 h-7 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m2.707 14.293 5.586-5.586a1 1 0 0 0 0-1.414L2.707 1.707A1 1 0 0 0 1 2.414v11.172a1 1 0 0 0 1.707.707Z" />
              </svg>
            </div>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default VehicleDetails;
