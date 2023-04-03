import express from 'express';
import mongoose from 'mongoose';
import { Router, Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const route = Router();

app.use(express.json());
app.use(route);

// Informando ao ESLINT que process.env.PORT não vai ser nulo
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
app.listen(parseInt(process.env.PORT!), () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@final-challenge.c2do336.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log('Conectado ao BD');
    });
});

//
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'OK' });
});
