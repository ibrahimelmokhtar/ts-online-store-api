import { Request, Response, Router } from 'express';
import * as ordersController from '../../controllers/orders.controller';
import validateRequest from '../../middlewares/validator.middleware';
import {
	orderBodyValidationRules,
	orderStatusBodyValidationRules,
	orderParamsValidationRules,
} from '../../schemas/orders.schemas';

// create Express Router:
const ordersRoute: Router = Router();

// sample GET method from orders route:
ordersRoute.get('/', async (_req: Request, res: Response): Promise<void> => {
	res.json({
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
	});
});

// available routes for CRUD operations within /orders route:

// CREATE ONE:
ordersRoute.post(
	'/create',
	orderBodyValidationRules,
	validateRequest,
	ordersController.createController
);

// READ ONE:
ordersRoute.get(
	'/show',
	orderParamsValidationRules,
	validateRequest,
	(_req: Request, res: Response) => {
		res.json({
			message: 'Order ID is required ...',
		});
	}
);

ordersRoute.get(
	'/show/:orderID',
	orderParamsValidationRules,
	validateRequest,
	ordersController.showController
);

// READ ALL:
ordersRoute.get('/showAll', ordersController.showAllController);

// UPDATE ONE:
ordersRoute.put(
	'/updateStatus',
	orderParamsValidationRules,
	validateRequest,
	(_req: Request, res: Response) => {
		res.json({
			message: 'Order ID is required ...',
		});
	}
);

ordersRoute.put(
	'/updateStatus/:orderID',
	orderParamsValidationRules,
	orderStatusBodyValidationRules,
	validateRequest,
	ordersController.updateController
);

// DELETE ONE:
ordersRoute.delete(
	'/delete',
	orderParamsValidationRules,
	validateRequest,
	(_req: Request, res: Response) => {
		res.json({
			message: 'Order ID is required ...',
		});
	}
);

ordersRoute.delete(
	'/delete/:orderID',
	orderParamsValidationRules,
	validateRequest,
	ordersController.deleteController
);

export default ordersRoute;
