/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { signToken } from '../utils/utils';

const createSendToken = (id: string, email: string, res: Response) => {
  const token = signToken(id, email);
  const cookieOptions = {
    // Cookie que salva o JWT é válido por 12 horas
    expires: new Date(Date.now() + 43200000),
    httpOnly: true,
  };
  res.cookie('JWT', token, cookieOptions);

  return token;
};

const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  if (req.headers.cookie) {
    token = req.headers.cookie.split('=')[1];
  }
  if (!token) {
    return res.status(401).json({
      status: res.status,
      message: 'Você não está logado',
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const decoded: any = jwt.verify(token, process.env.SECRET!);
  const currentUser = await User.findById(decoded.id!);

  if (!currentUser) {
    return res.status(401).json({
      status: res.status,
      message: 'Esse token não é mais válido',
    });
  }
  res.locals.user = currentUser;
  next();
};

const logout = async (_: Request, res: Response) => {
  res.clearCookie('JWT');
  return res.status(401).json({
    status: res.status,
    message: 'User Logged out',
  });
};

export { createSendToken, protect, logout };
