import express from 'express';
import {
  getCars,
  createCar,
  updateCar,
  getCar,
  deleteCar,
} from '../controller/controllerCar';
import { protect } from '../controller/authController';

const routerCar = express.Router();

routerCar
  .route('/car')
  .get(getCars) // Rota para obter todos os carros (Aceita filtro por query)
  .post(protect, createCar); // Rota para criar um carro
/* .patch(protect, controllerCar) */ // Rota para atualizar um carro - TODO: Verficar com os instrutores essa funcionalidade

routerCar
  .route('/car/:id')
  .get(getCar) // Rota para obter um carro por ID
  .delete(protect, deleteCar) // Rota para deletar um carro
  .put(protect, updateCar); // Rota para atualizar um carro por ID

export default routerCar;
