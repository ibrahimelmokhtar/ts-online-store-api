import { Request, Response, Router } from 'express';
import usersRoute from './api/users.routes';
import productsRoute from './api/products.routes';
import ordersRoute from './api/orders.routes';
import orderProductsRoute from './api/orderProducts.routes';
import dashboardRoute from './api/dashboard.routes';

// create Express Router:
const mainRoute: Router = Router();

// configure used routes:
mainRoute.use('/users', usersRoute);
mainRoute.use('/products', productsRoute);
mainRoute.use('/orders', ordersRoute);
mainRoute.use('/orders', orderProductsRoute);
mainRoute.use('/dashboard', dashboardRoute);

// sample GET method from main route:
mainRoute.get('/', async (_req: Request, res: Response): Promise<void> => {
	res.json({
		message: 'inside << main >> route',
		possibleRoutes: [
			'/users',
			'/products',
			'/orders',
			'/orders/:orderID',
			'/dashboard',
		],
	});
});

export default mainRoute;
