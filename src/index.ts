import express from 'express';
import { Router, Request, Response } from 'express';
const app = express();
const route = Router();

app.use(express.json());
app.use(route);

app.listen(3000, () => 'Server Running');

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'OK' });
});
