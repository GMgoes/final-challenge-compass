import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import routeCar from './routes/routeCar';
import routerUser from './routes/routeUser';
import routerReservation from './routes/routeReservations';
import swaggerUi from 'swagger-ui-express';
dotenv.config();

const app = express();
import swaggerDocument from './documentation/swaggerdocs.json';

app.use(express.json());
app.use('/api/v1', routeCar);
app.use('/api/v1', routerUser);
app.use('/api/v1', routerReservation);
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
app.listen(parseInt(process.env.PORT!), () => {
  mongoose.connect(
    `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@final-challenge.c2do336.mongodb.net/?retryWrites=true&w=majority`
  );
});
