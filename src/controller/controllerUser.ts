import { Request, Response } from 'express';

const createUser = (_req: Request, res: Response) => {
  res.json({ message: 'Rota para criar um usuário' });
};

const loginUser = (_req: Request, res: Response) => {
  res.json({ message: 'Rota para logar com as credenciais do usuário' });
};

export { createUser, loginUser };
