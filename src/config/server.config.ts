import express, { Application, json } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import mainRoute from '../routes';

// create Express server:
const app: Application = express();

// configure view engine:
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../src/views'));

// configure layout path:
app.set('layout', 'layouts/layout');

// configure static files [stylesheets, images, ...etc.]:
app.use(express.static(path.join(__dirname, '../../src/public')));

// configure middlewares:
app.use(
	expressLayouts, // Layout support for ejs
	cors(), // cross origin allowance middleware
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
