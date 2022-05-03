import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mainRoute from '../routes';

// create Express server:
const app: Application = express();

// configure dotenv:
dotenv.config();

// configure middlewares:
app.use(helmet(), morgan('short'));

// configure main route:
app.use('/', mainRoute);

export default app;
