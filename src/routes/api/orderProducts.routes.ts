import { Request, Response, Router } from 'express';
import * as orderProductsController from '../../controllers/orderProducts.controller';
import validateRequest from '../../middlewares/validator.middleware';
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
		res.json({ message: 'inside << orderProducts >> route.' });
	}
);

// available routes for CRUD operations within /orders/:orderID route:

// ADD NEW PRODUCT:
orderProductsRoute.post(
	'/:orderID/products/add',
	orderParamsValidationRules,
	orderProductBodyValidationRules,
	validateRequest,
	orderProductsController.addProductController
);

// READ ONE PRODUCT:
orderProductsRoute.get(
	'/:orderID/products/show',
	orderParamsValidationRules,
	validateRequest,
	(_req: Request, res: Response) => {
		res.json({
			message: 'Product ID is required ...',
		});
	}
);

orderProductsRoute.get(
	'/:orderID/products/show/:productID',
	orderParamsValidationRules,
	productParamsValidationRules,
	orderProductBodyValidationRules,
	validateRequest,
	orderProductsController.showProductController
);

// READ ALL PRODUCTS:
orderProductsRoute.get(
	'/:orderID/products/showAll',
	orderParamsValidationRules,
	validateRequest,
	orderProductsController.showAllProductsController
);

// READ ALL PRODUCTS:
orderProductsRoute.put(
	'/:orderID/products/update',
	orderParamsValidationRules,
	validateRequest,
	(_req: Request, res: Response) => {
		res.json({
			message: 'Product ID is required ...',
		});
	}
);

orderProductsRoute.put(
	'/:orderID/products/update/:productID',
	orderParamsValidationRules,
	productParamsValidationRules,
	orderProductBodyValidationRules,
	validateRequest,
	orderProductsController.updateProductController
);

// DELETE PRODUCT:
orderProductsRoute.delete(
	'/:orderID/products/delete',
	orderParamsValidationRules,
	validateRequest,
	(_req: Request, res: Response) => {
		res.json({
			message: 'Product ID is required ...',
		});
	}
);

orderProductsRoute.delete(
	'/:orderID/products/delete/:productID',
	orderParamsValidationRules,
	productParamsValidationRules,
	validateRequest,
	orderProductsController.deleteProductController
);

export default orderProductsRoute;
