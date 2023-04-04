import express, { Request, Response } from 'express';

const routerReservation = express.Router();

routerReservation
  // Rota para cadastrar uma reserva com os dados do body
  .post('/reserve', (_req: Request, res: Response) => {
    res.json({
      message: 'Rota para cadastrar uma reserva com os dados do body',
    });
  })
  // Rota para listar todas as reservas, possível filtrar também por query
  .get('/reserve', (_req: Request, res: Response) => {
    res.json({
      message:
        'Rota para listar todas as reservas, possível filtrar também por query',
    });
  });

routerReservation
  // Rota para listar reservas por ID
  .get('/reserve/:id', (_req: Request, res: Response) => {
    res.json({ message: 'Rota para listar reservas via ID' });
  })
  // Rota para deletar uma reserva através de um ID
  .delete('/reserve/:id', (_req: Request, res: Response) => {
    res.json({ message: 'Rota para deletar uma reserva através de um ID' });
  })
  // Rota para atualizar uma reserva através de um ID
  .put('/reserve/:id', (_req: Request, res: Response) => {
    res.json({ message: 'Rota para atualizar uma reserva através de um ID' });
  });

export default routerReservation;
