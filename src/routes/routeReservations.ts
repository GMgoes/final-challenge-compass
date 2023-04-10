import express from 'express';
import {
  createReserve,
  deleteReserve,
  getReserve,
  getReserves,
  updateReserve,
} from '../controller/controllerReservations';
import { protect } from '../controller/authController';

const routerReservation = express.Router();

routerReservation
  .route('/reserve')
  .post(protect, createReserve) // OK
  .get(getReserves); // OK

routerReservation
  .route('/reserve/:id')
  .get(getReserve) // OK
  .delete(protect, deleteReserve) // OK
  .put(protect, updateReserve); // OK

export default routerReservation;
