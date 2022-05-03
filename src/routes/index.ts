import { Request, Response, Router } from 'express';
import usersRoute from './api/users.route';
import productsRoute from './api/products.route';
import ordersRoute from './api/orders.route';

// create Express Router:
const mainRoute: Router = Router();

// configure used routes:
mainRoute.use('/', [usersRoute, productsRoute, ordersRoute]);

// sample GET method from main route:
mainRoute.get('/', async (_req: Request, res: Response): Promise<void> => {
	res.send('inside << main >> route');
});

export default mainRoute;
