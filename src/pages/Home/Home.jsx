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
        setOpacity1(1);
        setOpacity2(0);
        setOpacity3(0);
        setOpacity4(0);
        setShow(2);
      } else if (show === 2) {
        setOpacity1(0);
        setOpacity2(1);
        setOpacity3(0);
        setOpacity4(0);
        setShow(3);
      } else if (show === 3) {
        setOpacity1(0);
        setOpacity2(0);
        setOpacity3(1);
        setOpacity4(0);
        setShow(4);
      } else {
        setOpacity1(0);
        setOpacity2(0);
        setOpacity3(0);
        setOpacity4(1);
        setShow(1);
      }
    }
    let intervalId = setInterval(() => heroFun(), 5000);

    return () => clearInterval(intervalId);
  }, [show]);

  const galleryCars = useSelector(carsSelectors.getFilteredCars);

  return (
    <>
      <section className={css.section}>
        <p className={css.heroBest}>Best Rental Cars</p>
        <ul className={css.homeCardList}>
          {galleryCars
            .filter(car => parseFloat(car.rentalPrice.substring(1)) > 200)
            .map((car, index) => {
              const rentalPrice = parseFloat(car.rentalPrice.substring(1));
              const opacity = show === index + 1 ? 1 : 0;

              return (
                <li key={car.id} className={css.homeCard} style={{ opacity }}>
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
                  />
                </li>
              );
            })}
          <div className={css.buttons}>
            <NavLink to="/catalog" className={css.toCatalogLink}>
              <button type="button" className={css.toCatalogBtn}>
                See all catalog
              </button>
            </NavLink>
          </div>
        </ul>
      </section>
      <div className={css.info}>
        <h1>Uk Rental Car</h1>
        <h2>The best rental car service in Ukraine </h2>
      </div>
    </>
  );
};

export default Home;
