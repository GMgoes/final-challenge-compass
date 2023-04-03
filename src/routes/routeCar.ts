import express, { Router, Request, Response } from 'express';

const routerCar = express.Router();

routerCar
  // Rota para pegar todos os carros e se for passado uma query, filtra por query
  .get('/', (_req: Request, res: Response) => {
    res.json({
      message: 'Rota para pegar todos os carros ou filtrar por query',
    });
  })
  // Rota pra criar um registro de carro
  .post('/', (_req: Request, res: Response) => {
    res.json({ message: 'Rota para criar um registro de carro' });
  })
  // Rota para atualizar um carro utilizando query
  .put('/', (_req: Request, res: Response) => {
    res.json({ message: 'Rota para atualizar um carro utilizando query' });
  });
// TODO: Verificar com os instrutores
/* .patch('/', (_req: Request, res: Response) => {
    res.json({ message: 'OK' });
}) */

routerCar
  // Rota para listar carro por ID
  .get('/:id', (_req: Request, res: Response) => {
    res.json({ message: 'Rota para listar carro por ID' });
  })
  // Rota para remover um carro por ID
  .delete('/:id', (_req: Request, res: Response) => {
    res.json({ message: 'Rota para remover carro por ID' });
  });

export default routerCar;
