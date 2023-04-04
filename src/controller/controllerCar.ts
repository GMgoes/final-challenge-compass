import { Request, Response } from 'express';

const getCars = (_req: Request, res: Response) => {
  res.json({
    message: 'Rota para pegar todos os carros ou filtrar por query',
  });
};

const createCar = (_req: Request, res: Response) => {
  res.json({
    message: 'Rota para criar um novo carro',
  });
};

const updateCar = (_req: Request, res: Response) => {
  res.json({
    message: 'Rota para atualizar um carro utilizando query',
  });
};

const getCar = (_req: Request, res: Response) => {
  res.json({
    message: 'Rota para listar carro por ID',
  });
};

const deleteCar = (_req: Request, res: Response) => {
  res.json({
    message: 'Rota para remover carro por ID',
  });
};

export { getCars, createCar, updateCar, getCar, deleteCar };
