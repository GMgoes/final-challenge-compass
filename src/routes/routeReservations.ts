import express from 'express';
import {
  createReserve,
  deleteReserve,
  getReserve,
  getReserves,
  updateReserve,
} from '../controller/controllerReservations';

const routerReservation = express.Router();

/* Rota para cadastrar uma reserva com os dados do body e 
  Rota para listar todas as reservas, possível filtrar também por query */
routerReservation.route('/reserve').post(createReserve).get(getReserves); // - TODO:Em Desenvolvimento

routerReservation
  .route('/reserve/:id')
  .get(getReserve) // Rota para listar reservas por ID - TODO:Em Desenvolvimento
  .delete(deleteReserve) // Rota para deletar uma reserva através de um ID - TODO:Em Desenvolvimento
  .put(updateReserve); // Rota para atualizar uma reserva através de um ID - TODO:Em Desenvolvimento

export default routerReservation;
