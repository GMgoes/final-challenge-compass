import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import routeCar from './routes/routeCar';
import routerUser from './routes/routeUser';
dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/v1', routeCar);
app.use('/api/v1', routerUser);

// Informando ao ESLINT que process.env.PORT não vai ser nulo
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
app.listen(parseInt(process.env.PORT!), () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@final-challenge.c2do336.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log('Conectado ao BD e Aplicação rodando');
    });
});
