import { Router } from 'express';
import * as dashboardController from '../../controllers/dashboard.controller';
import { authenticateUserToken } from '../../middlewares/authentication.middleware';

// create Express Router:
const dashboardRoute: Router = Router();

// READ ALL:
dashboardRoute
	.route('/productsInOrders')
	.get(
		authenticateUserToken,
		dashboardController.showProductsInOrdersController
	);

export default dashboardRoute;
