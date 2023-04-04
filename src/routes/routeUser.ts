import express, { Request, Response } from 'express';

const routerUser = express.Router();

routerUser
  // Rota para cadastrar um usuário
  .post('/user', (_req: Request, res: Response) => {
    res.json({ message: 'Rota para criar um usuário' });
  })
  // Rota para logar com as credenciais do usuário
  .post('/user/authenticate', (_req: Request, res: Response) => {
    res.json({ message: 'Rota para logar com as credenciais do usuário' });
  });

export default routerUser;
