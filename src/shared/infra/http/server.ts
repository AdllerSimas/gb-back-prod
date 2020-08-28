import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction} from 'express';
import  cors from 'cors';
import { errors } from 'celebrate';
// src/server.ts
import 'express-async-errors';
import routes from './routes/index';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import rateLimiter from './middlewares/rateLimiter';

//connection database by typeorm
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();


app.use(cors());
app.use(express.json());
//route static files
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);


app.use(errors());

//middleware for errors
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })

});

// app.get('/', (request, response) => {
//     return response.json({ message: 'Hello World'})
// })

app.listen(3333, () => {
    console.log("Server is running on port 3333");
})


