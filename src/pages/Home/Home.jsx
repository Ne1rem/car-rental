import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import css from './Home.module.css';
import { useSelector } from 'react-redux';
import carsSelectors from 'redux/cars-selectors';
import HomeCard from 'components/HomeCard/HomeCard';

const Home = () => {
  const [show, setShow] = useState(1);
  const [opacity, setOpacity] = useState({
    opacity1: 1,
    opacity2: 0,
    opacity3: 0,
    opacity4: 0,
  });
  const galleryCars = useSelector(carsSelectors.getFilteredCars);

  useEffect(() => {
    function heroFun() {
      const newOpacity = { ...opacity };

      if (show === 1) {
        newOpacity.opacity1 = 1;
        newOpacity.opacity2 = 0;
        newOpacity.opacity3 = 0;
        newOpacity.opacity4 = 0;
        setShow(2);
      } else if (show === 2) {
        newOpacity.opacity1 = 0;
        newOpacity.opacity2 = 1;
        newOpacity.opacity3 = 0;
        newOpacity.opacity4 = 0;
        setShow(3);
      } else if (show === 3) {
        newOpacity.opacity1 = 0;
        newOpacity.opacity2 = 0;
        newOpacity.opacity3 = 1;
        newOpacity.opacity4 = 0;
        setShow(4);
      } else {
        newOpacity.opacity1 = 0;
        newOpacity.opacity2 = 0;
        newOpacity.opacity3 = 0;
        newOpacity.opacity4 = 1;
        setShow(1);
      }

      setOpacity(newOpacity);
    }

    let intervalId = setInterval(() => heroFun(), 4000);

    return () => clearInterval(intervalId);
  }, [show, opacity]);

  return (
    <>
      <section className={css.section}>
        <div className={css.info}>
          <h1>Uk Rental Car</h1>
          <h2>The best rental car service in Ukraine</h2>
        </div>
        <ul className={css.homeCardList}>
          {galleryCars
            .filter(car => parseFloat(car.rentalPrice.substring(1)) > 200)
            .map((car, index) => {
              const rentalPrice = parseFloat(car.rentalPrice.substring(1));
              const opacity = show === index + 1 ? 1 : 0;

              return (
                <li key={car.id} className={css.homeCard} style={{ opacity: opacity }}>
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
      <p className={css.heroBest}>
        Our UK Rental Car company is a dynamically developing company, one of
        the largest in Kyiv, given the number of vehicle collection/delivery
        points.
      </p>
    </>
  );
};

export default Home;
