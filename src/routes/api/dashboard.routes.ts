import { Request, Response, Router } from 'express';
import * as dashboardController from '../../controllers/dashboard.controller';

// create Express Router:
const dashboardRoute: Router = Router();

// sample GET method from orders route:
dashboardRoute.get('/', async (_req: Request, res: Response): Promise<void> => {
	res.json({ message: 'inside << dashboard >> route.' });
});

// READ ALL:
dashboardRoute.get(
	'/productsInOrders',
	dashboardController.showProductsInOrdersController
);

export default dashboardRoute;
