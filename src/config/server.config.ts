import express, { Application, json } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mainRoute from '../routes';

// create Express server:
const app: Application = express();

// configure dotenv:
dotenv.config();

// configure middlewares:
app.use(json(), helmet());

// configure main route:
app.use('/', mainRoute);

export default app;
