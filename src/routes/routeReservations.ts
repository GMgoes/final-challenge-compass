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
  .post(protect, createReserve) // Rota para cadastrar uma reserva com os dados do body
  .get(getReserves); // Rota para listar todas as reservas, possível filtrar também por query

routerReservation
  .route('/reserve/:id')
  .get(getReserve) // Rota para listar reservas por ID
  .delete(protect, deleteReserve) // Rota para deletar uma reserva através de um ID
  .put(protect, updateReserve); // Rota para atualizar uma reserva através de um ID

export default routerReservation;
