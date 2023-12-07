import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import css from './Home.module.css';
import hero1 from 'assets/hero1.svg';
import hero2 from 'assets/hero2.svg';
import hero3 from 'assets/hero3.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePage, setModal, setModalCar } from 'redux/cars-slice';
import CarCard from 'components/CarCard/CarCard';
import carsSelectors from 'redux/cars-selectors';

const Home = () => {
  const TEL_NUMBER = process.env.REACT_APP_TEL;

  const [opacity1, setOpacity1] = useState(1);
  const [opacity2, setOpacity2] = useState(0);
  const [opacity3, setOpacity3] = useState(0);

  const [show, setShow] = useState(1);
  const [margin, setMargin] = useState(window.innerWidth / 3.3334 - 127);
  const dispatch = useDispatch();

  useEffect(() => {
    setMargin(window.innerWidth / 3.3334 - 127);

    dispatch(setActivePage('home'));

    function heroFun() {
      if (show === 1) {
        setOpacity1(0);
        setOpacity2(1);
        setShow(2);
      } else if (show === 2) {
        setOpacity2(0);
        setOpacity3(1);
        setShow(3);
      } else {
        setOpacity1(1);
        setOpacity3(0);
        setShow(1);
      }
    }
    let intervalId = setInterval(() => heroFun(), 5000);

    return () => clearInterval(intervalId);
  }, [dispatch, show]);

    const galleryCars = useSelector(carsSelectors.getFilteredCars);

    const openModalHandler = e => {
      dispatch(setModalCar(e.target.id));
      dispatch(setModal(true));
  
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', escHandler);
    };
  
    const closeModalHandler = e => {
      if (e.target.id === 'overlay' || e.currentTarget.id === 'closeModal') {
        dispatch(setModal(false));
        window.removeEventListener('keydown', escHandler);
      }
      document.body.style.overflow = 'unset';
    };
  
    const escHandler = e => {
      if (e.code === 'Escape') {
        dispatch(setModal(false));
        window.removeEventListener('keydown', escHandler);
      }
    };

  return (
    <>
      <section className={css.section}>
      <p className={css.heroBest}>Best Rental Cars</p>
      {galleryCars.map(car => {
              return (
                <li className={css.carCard} key={car.id}>
                  <CarCard
                    id={car.id}
                    img={car.img}
                    photoLink={car.photoLink}
                    make={car.make}
                    model={car.model}
                    year={car.year}
                    rentalPrice={car.rentalPrice} 
                    address={car.address}
                    type={car.type}
                    functionalities={car.functionalities}
                    mileage={car.mileage}
                    rentalCompany={car.rentalCompany}
                    openModalHandler={openModalHandler}
                  />
                </li>
              );
            })}
      </section>
      <div className={css.info} style={{ marginTop: margin }}>
        <h1>DriveEasy Rental</h1>
        <h2>The best car rental service in the world </h2>
        <div className={css.buttons}>
          <NavLink to="/catalog" className={css.toCatalogLink}>
            <button type="button" className={css.toCatalogBtn}>
              Catalog
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Home;
