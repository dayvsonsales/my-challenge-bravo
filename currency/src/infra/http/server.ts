import '../../setup';

import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import 'express-async-errors';
import AppError from '@errors/AppError';

import '@container/index';
import '@container/providers';

import routes from './routes';

import '@infra/typeorm/database';
import { ValidationError } from 'yup';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  if (err instanceof ValidationError) {
    if (err.errors && err.errors.length > 1) {
      return response
        .status(400)
        .json({ status: 'error', message: JSON.stringify(err.errors) });
    }

    return response.status(400).json({ status: 'error', message: err.message });
  }

  console.error(err);

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
