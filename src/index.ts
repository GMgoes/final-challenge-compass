import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import routeCar from './routes/routeCar';
import routerUser from './routes/routeUser';
import routerReservation from './routes/routeReservations';
dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/v1', routeCar);
app.use('/api/v1', routerUser);
app.use('/api/v1', routerReservation);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
app.listen(parseInt(process.env.PORT!), () => {
  mongoose.connect(
    `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@final-challenge.c2do336.mongodb.net/?retryWrites=true&w=majority`
  );
});
