import { Request, Response, Router } from 'express';
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

// sample GET method from orders route:
ordersRoute.get('/', async (_req: Request, res: Response): Promise<void> => {
	res.status(404)
		.json({
			status: 'Error 404: Not Found',
			message: 'inside << orders >> route.',
			possibleRoutes: [
				'/create',
				'/show/:orderID',
				'/showAll',
				'/updateStatus/:orderID',
				'/delete/:orderID',
				'/:orderID/products/add',
				'/:orderID/products/show/:productID',
				'/:orderID/products/showAll',
			],
		})
		.end();
	return;
});

// available routes for CRUD operations within /orders route:

// CREATE ONE:
ordersRoute.post(
	'/create',
	orderBodyValidationRules,
	validateRequest,
	authenticateUser,
	ordersController.createController
);

// READ ONE:
ordersRoute.get(
	'/show',
	orderParamsValidationRules,
	validateRequest,
	async (_req: Request, res: Response): Promise<void> => {
		res.status(404)
			.json({
				status: 'Error 404: Not Found',
				message: 'Order ID is required.',
			})
			.end();
		return;
	}
);

ordersRoute.get(
	'/show/:orderID',
	orderParamsValidationRules,
	validateRequest,
	authenticateUser,
	ordersController.showController
);

// READ ALL:
ordersRoute.get(
	'/showAll',
	authenticateUser,
	ordersController.showAllController
);

// UPDATE ONE:
ordersRoute.put(
	'/updateStatus',
	orderParamsValidationRules,
	validateRequest,
	async (_req: Request, res: Response): Promise<void> => {
		res.status(404)
			.json({
				status: 'Error 404: Not Found',
				message: 'Order ID is required.',
			})
			.end();
		return;
	}
);

ordersRoute.put(
	'/updateStatus/:orderID',
	orderParamsValidationRules,
	orderStatusBodyValidationRules,
	validateRequest,
	authenticateUser,
	ordersController.updateController
);

// DELETE ONE:
ordersRoute.delete(
	'/delete',
	orderParamsValidationRules,
	validateRequest,
	async (_req: Request, res: Response): Promise<void> => {
		res.status(404)
			.json({
				status: 'Error 404: Not Found',
				message: 'Order ID is required.',
			})
			.end();
		return;
	}
);

ordersRoute.delete(
	'/delete/:orderID',
	orderParamsValidationRules,
	validateRequest,
	authenticateUser,
	ordersController.deleteController
);

export default ordersRoute;
