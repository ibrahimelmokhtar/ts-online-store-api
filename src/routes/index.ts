import { Request, Response, Router } from 'express';
import usersRoute from './api/users.routes';
import productsRoute from './api/products.routes';
import ordersRoute from './api/orders.routes';
import orderProductsRoute from './api/orderProducts.routes';

// create Express Router:
const mainRoute: Router = Router();

// configure used routes:
mainRoute.use('/users', usersRoute);
mainRoute.use('/products', productsRoute);
mainRoute.use('/orders', ordersRoute);
mainRoute.use('/orders', orderProductsRoute);

// sample GET method from main route:
mainRoute.get('/', async (_req: Request, res: Response): Promise<void> => {
	res.send('inside << main >> route');
});

export default mainRoute;
