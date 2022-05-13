import { Router } from 'express';
import * as orderProductsController from '../../controllers/orderProducts.controller';
import { authenticateUser } from '../../middlewares/authentication.middleware';
import validateRequest from '../../middlewares/validation.middleware';
import { orderProductBodyValidationRules } from '../../schemas/orderProducts.schemas';
import { orderParamsValidationRules } from '../../schemas/orders.schemas';
import { productParamsValidationRules } from '../../schemas/products.schemas';

// create Express Router:
const orderProductsRoute: Router = Router();

// ADD NEW PRODUCT INTO ORDER: (/orders/:orderID/add)
orderProductsRoute
	.route('/:orderID/add')
	.post(
		orderParamsValidationRules,
		orderProductBodyValidationRules,
		validateRequest,
		authenticateUser,
		orderProductsController.addProductController
	);

// READ ALL PRODUCTS: (/orders/:orderID/products)
orderProductsRoute
	.route('/:orderID/products')
	.get(
		orderParamsValidationRules,
		validateRequest,
		authenticateUser,
		orderProductsController.showAllProductsController
	);

// MANIPULATE SPECIFIC PRODUCT WITHIN ORDER: (/orders/:orderID/:productID)
orderProductsRoute
	.route('/:orderID/:productID')
	// READ: (/orders/:orderID/:productID)
	.get(
		orderParamsValidationRules,
		productParamsValidationRules,
		validateRequest,
		authenticateUser,
		orderProductsController.showProductController
	);

export default orderProductsRoute;
