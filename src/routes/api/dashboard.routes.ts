import { Request, Response, Router } from 'express';
import * as dashboardController from '../../controllers/dashboard.controller';
import { authenticateUser } from '../../middlewares/authentication.middleware';

// create Express Router:
const dashboardRoute: Router = Router();

// sample GET method from orders route:
dashboardRoute.get('/', async (_req: Request, res: Response): Promise<void> => {
	res.status(404)
		.json({
			status: 'Error 404: Not Found',
			message: 'inside << dashboard >> route.',
			possibleRoutes: ['/productsInOrders'],
		})
		.end();
	return;
});

// READ ALL:
dashboardRoute.get(
	'/productsInOrders',
	authenticateUser,
	dashboardController.showProductsInOrdersController
);

export default dashboardRoute;
