/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { signToken } from '../utils/utils';

// OK
const createSendToken = (id: string, email: string, res: Response) => {
  const token = signToken(id, email);
  const cookieOptions = {
    // Cookie that save JWT is valid for 12 hours
    expires: new Date(Date.now() + 43200000),
    httpOnly: true,
  };
  res.cookie('JWT', token, cookieOptions);

  return token;
};

// OK
const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  // We check if we have the cookie with the JWT stored in the headers of our request, which means that the user is logged in
  if (req.headers.cookie) {
    token = req.headers.cookie.split('=')[1];
  }
  if (!token) {
    return res.status(401).json({
      status: res.status,
      message: 'You are not logged in',
    });
  }

  // Decode the stored token and verify that it is valid and that it belongs to a user
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const decoded: any = jwt.verify(token, process.env.SECRET!);
  const currentUser = await User.findById(decoded.id!);

  if (!currentUser) {
    return res.status(401).json({
      status: res.status,
      message: 'This token is no longer valid',
    });
  }
  res.locals.user = currentUser;
  next();
};

// OK
const logout = async (_: Request, res: Response) => {
  // We delete the JWT token in the browser header
  res.clearCookie('JWT');
  return res.status(401).json({
    status: res.status,
    message: 'User Logged out',
  });
};

export { createSendToken, protect, logout };
