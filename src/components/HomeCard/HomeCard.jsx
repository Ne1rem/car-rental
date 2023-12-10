import React from 'react';
import css from '../../pages/Home/Home.module.css';

const HomeCard = ({
  id,
  img,
  photoLink,
  make,
  model,
  year,
  rentalPrice,
  address,
  type,
  mileage,
  rentalCompany,
  openModalHandler,
}) => {
  return (
    <>
      <div className={css.HomeDivText}>
        <div className={css.HomeimageWrapper}>
          <img
            src={!img ? photoLink : img}
            alt="car_image"
            className={css.HomecarImage}
          />
        </div>
        <div className={css.divClassText}>
          <div className={css.Hometitle}>
            <p>
              {make}
              <span className={css.Homemodel}>{model},</span>
              <span className={css.Homeyear}>Year:{year}</span>
            </p>
            <p className={css.Homeprice}>Price:{rentalPrice}</p>
          </div>
          <div className={css.Hometags}>
            <p>
              {address.split(',')[1]} <span> | </span>
              {address.split(',')[2]}
              <span> | </span>
              {rentalCompany}
              <span> | </span>
              {type}
              <span> | </span>
              {model}
              <span> | </span>
              {id}
              <span> | </span>
              {mileage}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeCard;
