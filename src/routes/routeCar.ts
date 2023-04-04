import express, { Request, Response } from 'express';
import {
  getCars,
  createCar,
  updateCar,
  getCar,
  deleteCar,
} from '../controller/controllerCar';

const routerCar = express.Router();

routerCar
  .route('/car')
  .get(getCars) // Rota para obter todos os carros (Aceita filtro por query) - TODO:Em Desenvolvimento
  .post(createCar) // Rota para criar um carro - TODO:Em Desenvolvimento
  .put(updateCar); // Rota para atualizar um carro - TODO:Em Desenvolvimento
/* .patch(controllerCar) */ // Verficar com os instrutores essa funcionalidade

routerCar.route('/car/:id').get(getCar).delete(deleteCar); // Rotas para obter um carro por ID e para deletar um carro - TODO:Em Desenvolvimento

export default routerCar;
