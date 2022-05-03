import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import morgan from 'morgan';
import dotenv from 'dotenv';

// create Express server:
const app:Application = express();

// configure dotenv:
dotenv.config();

app.use(
    helmet(),
    morgan('short')
);

// main route:
app.get('/', (_req: Request, res: Response): void => {
    res.json('Hello, world!')
});

export default app;
