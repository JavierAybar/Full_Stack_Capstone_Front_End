import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { fetchVehicles } from '../redux/reducers/vehiclesSlice';

const VehicleDetails = () => {
  const vehicles = useSelector((state) => state.vehicle.vehicle);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  return (
    <div className="container pt-5">
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px',
      }}
      >
        <h1>Latest Models</h1>
        <p>Please select a Model</p>
      </div>
      <Swiper
        grabCursor
        loop
        slidesPerView="auto"
        coverflowEffect={
          {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }
        }
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Navigation]}
      >
        {vehicles.map((car) => (
          <SwiperSlide className="swiper-container" key={car.id} style={{ width: '51%', display: 'flex', justifyContent: 'center' }}>
            <Link to={`/vehicles/${car.id}`}>
              <Card style={{
                width: '51%', border: 'none', textAlign: 'center',
              }}
              >
                <Card.Img variant="top" src={car.image} style={{ borderRadius: '4px' }} />
                <Card.Body>
                  <Card.Title>{car.name}</Card.Title>
                  <Card.Text>
                    {car.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </SwiperSlide>
        ))}
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon className="ion-icon" name="arrow-back-outline" />
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon className="ion-icon" name="arrow-forward-outline" />
          </div>
          <div className="swiper-pagination" />
        </div>
      </Swiper>

    </div>
  );
};

export default VehicleDetails;
