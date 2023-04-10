import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app } from './index';
dotenv.config();

const port = process.env.PORT || 3000;

mongoose
  .connect(
    `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@final-challenge.c2do336.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(port);
  });
