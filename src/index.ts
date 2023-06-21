import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import routes from './routers';
import { errorHandler } from './middlewares/errorHandler';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(routes);

app.get('/hello', (req, res) => {
  res.status(200).send('Hello world');
});

app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server running at port ${process.env.PORT} - IP: http://localhost:${process.env.PORT}`)
);
