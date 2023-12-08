import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import css from './Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePage, setModal, setModalCar } from 'redux/cars-slice';
import carsSelectors from 'redux/cars-selectors';
import Modal from 'components/Modal/Modal';
import Notiflix from 'notiflix';
import HomeCard from 'components/HomeCard/HomeCard';

const Home = () => {
  const TEL_NUMBER = process.env.REACT_APP_TEL;

  const isModalOn = useSelector(carsSelectors.getModalOn);

  const [opacity1, setOpacity1] = useState(1);
  const [opacity2, setOpacity2] = useState(0);
  const [opacity3, setOpacity3] = useState(0);
  const [opacity4, setOpacity4] = useState(0);

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
        setOpacity3(2)
        setShow(2);
      } else if (show === 2) {
        setOpacity2(0);
        setOpacity3(1);
        setOpacity4(2)
        setShow(3);
      } else if (show === 2) {
        setOpacity3(0);
        setOpacity4(1);
        setOpacity1(2)
        setShow(4);
      } else {
        setOpacity4(0);
        setOpacity1(1);
        setOpacity2(2)
        setShow(1);
      }
    }
    let intervalId = setInterval(() => heroFun(), 5000);

    return () => clearInterval(intervalId);
  }, [dispatch, show]);

  const galleryCars = useSelector(carsSelectors.getFilteredCars);

  const openModalHandler = (e) => {
    dispatch(setModalCar(e.target.id));
    dispatch(setModal(true));

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', escHandler);
  };

  const closeModalHandler = (e) => {
    if (e.target.id === 'overlay' || e.currentTarget.id === 'closeModal') {
      dispatch(setModal(false));
      window.removeEventListener('keydown', escHandler);
    }
    document.body.style.overflow = 'unset';
  };

  const escHandler = (e) => {
    if (e.code === 'Escape') {
      dispatch(setModal(false));
      window.removeEventListener('keydown', escHandler);
    }
  };

  const rentalCarHandler = () => {
    Notiflix.Notify.init({
      zindex: 9999999,
    });
    Notiflix.Notify.success('Contact us!');
  };

  return (
    <>
      {isModalOn && (
        <Modal
          closeModalHandler={closeModalHandler}
          rentalCarHandler={rentalCarHandler}
        />
      )}
      <section className={css.section}>
        <p className={css.heroBest}>Best Rental Cars</p>
        {galleryCars
          .filter((car) => parseFloat(car.rentalPrice.substring(1)) > 200)
          .map((car) => {
            const rentalPrice = parseFloat(car.rentalPrice.substring(1));

            return (
              <li className={css.homeCard} key={car.id}>
                <HomeCard
                  id={car.id}
                  img={car.img}
                  photoLink={car.photoLink}
                  make={car.make}
                  model={car.model}
                  year={car.year}
                  rentalPrice={rentalPrice}
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
