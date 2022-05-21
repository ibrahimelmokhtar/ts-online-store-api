import { Request, Response, Router } from 'express';
import usersRoute from './api/users.routes';
import productsRoute from './api/products.routes';
import ordersRoute from './api/orders.routes';
import orderProductsRoute from './api/orderProducts.routes';
import dashboardRoute from './api/dashboard.routes';
import { DEFAULT_USER } from '../constants/user.type.constant';

// create Express Router:
const mainRoute: Router = Router();

// configure used routes:
mainRoute.use('/users', usersRoute);
mainRoute.use('/products', productsRoute);
mainRoute.use('/orders', [ordersRoute, orderProductsRoute]);
mainRoute.use('/dashboard', dashboardRoute);

/**
 * Render Specific Pages:
 */

// Home Page:
mainRoute.get('/home', async (_req: Request, res: Response): Promise<void> => {
	res.status(200).render('pages/home.ejs', { user: DEFAULT_USER });
	return;
});

// Signup Page:
mainRoute.get(
	'/register',
	async (_req: Request, res: Response): Promise<void> => {
		res.status(200).render('forms/signup.ejs');
		return;
	}
);

// Signin Page:
mainRoute.get(
	'/signin',
	async (_req: Request, res: Response): Promise<void> => {
		res.status(200).render('forms/signin.ejs');
		return;
	}
);

export default mainRoute;
