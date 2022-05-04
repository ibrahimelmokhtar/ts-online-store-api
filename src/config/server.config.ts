import express, { Application, json } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import mainRoute from '../routes';

// create Express server:
const app: Application = express();

// configure middlewares:
app.use(
	json(), // JSON Parser middleware
	helmet(), // HTTP Security middleware
	morgan('dev', {
		// HTTP Request Logger middleware
		skip: () => {
			return process.env.NODE_ENV === 'test';
		},
	})
);

// configure main route:
app.use('/', mainRoute);

export default app;
