import { Request, Response, Router } from 'express';
import * as orderProductsController from '../../controllers/orderProducts.controller';
import { authenticateUser } from '../../middlewares/authentication.middleware';
import validateRequest from '../../middlewares/validation.middleware';
import { orderProductBodyValidationRules } from '../../schemas/orderProducts.schemas';
import { orderParamsValidationRules } from '../../schemas/orders.schemas';
import { productParamsValidationRules } from '../../schemas/products.schemas';

// create Express Router:
const orderProductsRoute: Router = Router();

// sample GET method from orders route:
orderProductsRoute.get(
	'/:orderID',
	orderParamsValidationRules,
	validateRequest,
	async (_req: Request, res: Response): Promise<void> => {
		res.status(404)
			.json({
				status: 'Error 404: Not Found',
				message: 'inside << orderProducts >> route.',
				possibleRoutes: [
					'/products/add',
					'/products/show/:productID',
					'/products/showAll',
				],
			})
			.end();
		return;
	}
);

// available routes for CRUD operations within /orders/:orderID route:

// ADD NEW PRODUCT:
orderProductsRoute.post(
	'/:orderID/products/add',
	orderParamsValidationRules,
	orderProductBodyValidationRules,
	validateRequest,
	authenticateUser,
	orderProductsController.addProductController
);

// READ ONE PRODUCT:
orderProductsRoute.get(
	'/:orderID/products/show',
	orderParamsValidationRules,
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

orderProductsRoute.get(
	'/:orderID/products/show/:productID',
	orderParamsValidationRules,
	productParamsValidationRules,
	validateRequest,
	authenticateUser,
	orderProductsController.showProductController
);

// READ ALL PRODUCTS:
orderProductsRoute.get(
	'/:orderID/products/showAll',
	orderParamsValidationRules,
	validateRequest,
	authenticateUser,
	orderProductsController.showAllProductsController
);

export default orderProductsRoute;
