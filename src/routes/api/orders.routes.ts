import { Request, Response, Router } from 'express';
import { DEFAULT_ORDER } from '../../constants/order.type.constant';
import { DEFAULT_USER } from '../../constants/user.type.constant';
import * as ordersController from '../../controllers/orders.controller';
import { authenticateUserToken } from '../../middlewares/authentication.middleware';
import validateRequest from '../../middlewares/validation.middleware';
import {
	orderBodyValidationRules,
	orderStatusBodyValidationRules,
	orderParamsValidationRules,
} from '../../schemas/orders.schemas';

// create Express Router:
const ordersRoute: Router = Router();

/**
 * Render Pages:
 */

// MAIN PRODUCTS VIEW:
// SHOW ALL PRODUCTS:
ordersRoute.route('/').get((_req: Request, res: Response) => {
	res.status(200).render('pages/orders/showAllOrders.ejs', {
		user: DEFAULT_USER,
		order: DEFAULT_ORDER,
	});
	return;
});

// ADD NEW PRODUCT:
ordersRoute.route('/add').get((_req: Request, res: Response) => {
	res.status(200).render('pages/orders/addOrder.ejs', {
		user: DEFAULT_USER,
		order: DEFAULT_ORDER,
	});
	return;
});

// SHOW SPECIFIC PRODUCT:
ordersRoute.route('/show').get((_req: Request, res: Response) => {
	res.status(200).render('pages/orders/showOrder.ejs', {
		user: DEFAULT_USER,
		order: DEFAULT_ORDER,
	});
	return;
});

// UPDATE SPECIFIC PRODUCT:
ordersRoute.route('/update').get((_req: Request, res: Response) => {
	res.status(200).render('pages/orders/updateOrder.ejs', {
		user: DEFAULT_USER,
		order: DEFAULT_ORDER,
	});
	return;
});

// DELETE SPECIFIC PRODUCT:
ordersRoute.route('/delete').get((_req: Request, res: Response) => {
	res.status(200).render('pages/orders/deleteOrder.ejs', {
		user: DEFAULT_USER,
		order: DEFAULT_ORDER,
	});
	return;
});

/**
 * CRUD Operations:
 */

// CREATE NEW ORDER: (/orders/create)
ordersRoute
	.route('/create')
	.post(
		orderBodyValidationRules,
		validateRequest,
		authenticateUserToken,
		ordersController.createController
	);

// READ ALL ORDERS: (/orders)
ordersRoute
	.route('/')
	.get(authenticateUserToken, ordersController.showAllController);

// MANIPULATE SPECIFIC ORDER: (/:orderID)
ordersRoute
	.route('/:orderID')
	// READ: (/orders/:orderID)
	.get(
		orderParamsValidationRules,
		validateRequest,
		authenticateUserToken,
		ordersController.showController
	)
	// UPDATE: (/orders/:orderID)
	.put(
		orderParamsValidationRules,
		orderStatusBodyValidationRules,
		validateRequest,
		authenticateUserToken,
		ordersController.updateController
	)
	// DELETE: (/orders/:orderID)
	.delete(
		orderParamsValidationRules,
		validateRequest,
		authenticateUserToken,
		ordersController.deleteController
	);

export default ordersRoute;
