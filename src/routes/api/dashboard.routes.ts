import { Router } from 'express';
import * as dashboardController from '../../controllers/dashboard.controller';
import { authenticateUserToken } from '../../middlewares/authentication.middleware';

// create Express Router:
const dashboardRoute: Router = Router();

/**
 * CRUD Operations:
 */

// READ ALL PRODUCTS IN ORDERS:
dashboardRoute
	.route('/productsInOrders')
	.get(
		authenticateUserToken,
		dashboardController.showProductsInOrdersController
	);

// READ RECENT ORDERS PER USER:
dashboardRoute
	.route('/recentOrders/:userID')
	.get(
		authenticateUserToken,
		dashboardController.showRecentOrdersPerUserController
	);

// READ TOP PRODUCTS:
dashboardRoute
	.route('/topProducts')
	.get(authenticateUserToken, dashboardController.showTopProductsController);

export default dashboardRoute;
