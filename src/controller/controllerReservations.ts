import { Request, Response } from 'express';

const createReserve = (_req: Request, res: Response) => {
  res.json({
    message: 'Rota para cadastrar uma reserva com os dados do body',
  });
};

const getReserves = (_req: Request, res: Response) => {
  res.json({
    message:
      'Rota para listar todas as reservas, possível filtrar também por query',
  });
};

const getReserve = (_req: Request, res: Response) => {
  res.json({ message: 'Rota para listar reservas via ID' });
};

const deleteReserve = (_req: Request, res: Response) => {
  res.json({ message: 'Rota para deletar uma reserva através de um ID' });
};

const updateReserve = (_req: Request, res: Response) => {
  res.json({ message: 'Rota para atualizar uma reserva através de um ID' });
};

export { createReserve, getReserves, getReserve, deleteReserve, updateReserve };
