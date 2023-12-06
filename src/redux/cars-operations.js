// import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchCars = createAsyncThunk('cars/getCars', async () => {
  try {
    const response = await fetch(
      'https://65705c4109586eff66413773.mockapi.io/getCar/CarRender',
      {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      }
    );
    const data = response.json();
    return data;
  } catch (error) {
    console.log('Error in Register', error.response.data);
    throw error();
  }
});

const carsOperations = {
  fetchCars,
};

export default carsOperations;
