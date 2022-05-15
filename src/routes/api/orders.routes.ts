import { Router } from 'express';
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
