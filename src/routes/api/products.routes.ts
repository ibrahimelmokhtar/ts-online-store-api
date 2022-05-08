import { Request, Response, Router } from 'express';
import * as productsController from '../../controllers/products.controller';
import validateRequest from '../../middlewares/validator.middleware';
import {
	productBodyValidationRules,
	productParamsValidationRules,
} from '../../schemas/products.schemas';

// create Express Router:
const productsRoute: Router = Router();

// sample GET method from products route:
productsRoute.get('/', async (_req: Request, res: Response): Promise<void> => {
	res.json({ message: 'inside << products >> route.' });
});

// available routes for CRUD operations within /products route:

// CREATE ONE:
productsRoute.post(
	'/create',
	productBodyValidationRules,
	validateRequest,
	productsController.createController
);

// READ ONE:
productsRoute.get(
	'/show',
	productParamsValidationRules,
	validateRequest,
	(_req: Request, res: Response) => {
		res.json({
			message: 'Product ID is required ...',
		});
	}
);

productsRoute.get(
	'/show/:id',
	productParamsValidationRules,
	validateRequest,
	productsController.showController
);

// READ ALL:
productsRoute.get('/showAll', productsController.showAllController);

// UPDATE ONE:
productsRoute.put(
	'/update',
	productParamsValidationRules,
	validateRequest,
	(_req: Request, res: Response) => {
		res.json({
			message: 'Product ID is required ...',
		});
	}
);

productsRoute.put(
	'/update/:id',
	productParamsValidationRules,
	productBodyValidationRules,
	validateRequest,
	productsController.updateController
);

// DELETE ONE:
productsRoute.delete(
	'/delete',
	productParamsValidationRules,
	validateRequest,
	(_req: Request, res: Response) => {
		res.json({
			message: 'Product ID is required ...',
		});
	}
);

productsRoute.delete(
	'/delete/:id',
	productParamsValidationRules,
	validateRequest,
	productsController.deleteController
);

export default productsRoute;
