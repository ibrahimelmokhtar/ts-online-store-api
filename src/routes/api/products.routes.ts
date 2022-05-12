import { Request, Response, Router } from 'express';
import * as productsController from '../../controllers/products.controller';
import { authenticateUser } from '../../middlewares/authentication.middleware';
import validateRequest from '../../middlewares/validation.middleware';
import {
	productBodyValidationRules,
	productParamsValidationRules,
} from '../../schemas/products.schemas';

// create Express Router:
const productsRoute: Router = Router();

// sample GET method from products route:
productsRoute.get('/', async (_req: Request, res: Response): Promise<void> => {
	res.status(404)
		.json({
			status: 'Error 404: Not Found',
			message: 'inside << products >> route.',
			possibleRoutes: [
				'/create',
				'/show/:productID',
				'/showAll',
				'/update/:productID',
				'/delete/:productID',
			],
		})
		.end();
	return;
});

// available routes for CRUD operations within /products route:

// CREATE ONE:
productsRoute.post(
	'/create',
	productBodyValidationRules,
	validateRequest,
	authenticateUser,
	productsController.createController
);

// READ ONE:
productsRoute.get(
	'/show',
	productParamsValidationRules,
	validateRequest,
	async (_req: Request, res: Response): Promise<void> => {
		res.status(404)
			.json({
				status: 'Error 404: Not Found',
				message: 'Product ID is required.',
			})
			.end();
		return;
	}
);

productsRoute.get(
	'/show/:productID',
	productParamsValidationRules,
	validateRequest,
	authenticateUser,
	productsController.showController
);

// READ ALL:
productsRoute.get(
	'/showAll',
	authenticateUser,
	productsController.showAllController
);

// UPDATE ONE:
productsRoute.put(
	'/update',
	productParamsValidationRules,
	validateRequest,
	async (_req: Request, res: Response): Promise<void> => {
		res.status(404)
			.json({
				message: 'Product ID is required.',
			})
			.end();
		return;
	}
);

productsRoute.put(
	'/update/:productID',
	productParamsValidationRules,
	productBodyValidationRules,
	validateRequest,
	authenticateUser,
	productsController.updateController
);

// DELETE ONE:
productsRoute.delete(
	'/delete',
	productParamsValidationRules,
	validateRequest,
	async (_req: Request, res: Response): Promise<void> => {
		res.status(404)
			.json({
				message: 'Product ID is required.',
			})
			.end();
		return;
	}
);

productsRoute.delete(
	'/delete/:productID',
	productParamsValidationRules,
	validateRequest,
	authenticateUser,
	productsController.deleteController
);

export default productsRoute;
