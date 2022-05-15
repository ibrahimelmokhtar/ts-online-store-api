import { Router } from 'express';
import * as dashboardController from '../../controllers/dashboard.controller';
import { authenticateUserToken } from '../../middlewares/authentication.middleware';

// create Express Router:
const dashboardRoute: Router = Router();

// READ ALL PRODUCTS IN ORDERS:
dashboardRoute
	.route('/productsInOrders')
	.get(
		authenticateUserToken,
		dashboardController.showProductsInOrdersController
	);

// READ RECENT ORDERS PER USER:
dashboardRoute
	.route('/:userID')
	.get(
		authenticateUserToken,
		dashboardController.showOrdersPerUserController
	);

export default dashboardRoute;
