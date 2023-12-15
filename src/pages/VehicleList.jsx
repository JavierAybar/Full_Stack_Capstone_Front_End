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

  // Índice para rastrear el color actual
  let colorIndex = 0;

  // Función para obtener el próximo color y actualizar el índice
  const getNextColor = () => {
    const color = predefinedColors[colorIndex];
    colorIndex = (colorIndex + 1) % predefinedColors.length;
    return color;
  };

  return (
    <div className="container full-height p-[0px]">
      <div className="flex flex-col items-center pb-[10px] pt-[70px]">
        <h1 className="text-4xl font-extrabold LINE">LATEST MODELS</h1>
        <p className="font-semibold text-stone-400">Please select a Model</p>
      </div>
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
        // style={{ height: '95%' }}
      >
        {vehicles.map((car) => (
          <SwiperSlide className="" key={car.id} style={{ display: 'flex', justifyContent: 'center'}}>
            <div className="shadow-l relative scale-75 card l:w-[42rem] w-[40rem] bg-base-100  text-center pt-0 mt-0" key={car.id}>
              <Link className="flex flex-col items-center" to={`/vehicles/${car.id}`}>
              <img src={car.image} alt={car.image} className="xl:h-[280px] z-1 h-[300px]" />
                  <figure className={`rounded-full w-[230px] top-20 h-[230px] absolute z-0 flex items-center ${getNextColor()}`}></figure>
                <div className="card-body">
                  <h2 className="mb-0 text-2xl font-bold">
                    {car.name}
                  </h2>
                  <p className="mb-2 text-xl tracking-widest text-stone-400">..............................</p>
                  <p className="mb-4 font-semibold text-stone-400">{car.description}</p>
                  <div className="flex justify-center gap-4 card-actions">
                    <div>
                      <FontAwesomeIcon className="text-2xl text-stone-400" icon={faFacebookSquare} />
                    </div>
                    <div>
                      <FontAwesomeIcon className="text-2xl text-stone-400" icon={faInstagramSquare} />
                    </div>
                    <div>
                      <FontAwesomeIcon className="text-2xl text-stone-400" icon={faSquareXTwitter} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
        <div className="slider-controler">
          <div className="xl:w-[70px] rounded-full swiper-button-prev slider-arrow bg-lime-400 ">
            <svg className="w-[10px] h-[10px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.293 1.707 1.707 7.293a1 1 0 0 0 0 1.414l5.586 5.586A1 1 0 0 0 9 13.586V2.414a1 1 0 0 0-1.707-.707Z" />
            </svg>
          </div>
          <div className=" xl:w-[70px] rounded-full swiper-button-next slider-arrow bg-lime-400 ">
            <svg className="w-[10px] h-[10px] text-gray-800 dark:text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m2.707 14.293 5.586-5.586a1 1 0 0 0 0-1.414L2.707 1.707A1 1 0 0 0 1 2.414v11.172a1 1 0 0 0 1.707.707Z" />
            </svg>
          </div>
        </div>
      </Swiper>

    </div>
  );
};

export default VehicleDetails;
