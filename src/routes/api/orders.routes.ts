import { Router } from 'express';
import * as ordersController from '../../controllers/orders.controller';
import { authenticateUser } from '../../middlewares/authentication.middleware';
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
		authenticateUser,
		ordersController.createController
	);

// READ ALL ORDERS: (/orders)
ordersRoute
	.route('/')
	.get(authenticateUser, ordersController.showAllController);

// MANIPULATE SPECIFIC ORDER: (/:orderID)
ordersRoute
	.route('/:orderID')
	// READ: (/orders/:orderID)
	.get(
		orderParamsValidationRules,
		validateRequest,
		authenticateUser,
		ordersController.showController
	)
	// UPDATE: (/orders/:orderID)
	.put(
		orderParamsValidationRules,
		orderStatusBodyValidationRules,
		validateRequest,
		authenticateUser,
		ordersController.updateController
	)
	// DELETE: (/orders/:orderID)
	.delete(
		orderParamsValidationRules,
		validateRequest,
		authenticateUser,
		ordersController.deleteController
	);

export default ordersRoute;
