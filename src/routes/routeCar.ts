import express from 'express';
import {
  getCars,
  createCar,
  updateCar,
  getCar,
  deleteCar,
  updateAccessories,
} from '../controller/controllerCar';
import { protect } from '../controller/authController';

const routerCar = express.Router();

routerCar
  .route('/car')
  .get(getCars) // OK
  .post(protect, createCar); // OK

routerCar
  .route('/car/:id')
  .get(getCar) // OK
  .delete(protect, deleteCar) // OK
  .put(protect, updateCar); // OK

routerCar.route('/car/:id/acessories/:id').patch(protect, updateAccessories); // OK

export default routerCar;
