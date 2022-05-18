import { Router } from 'express';
import * as productsController from '../../controllers/products.controller';
import { authenticateUserToken } from '../../middlewares/authentication.middleware';
import validateRequest from '../../middlewares/validation.middleware';
import {
	productBodyValidationRules,
	productParamsValidationRules,
} from '../../schemas/products.schemas';

// create Express Router:
const productsRoute: Router = Router();

/**
 * CRUD Operations:
 */

// CREATE NEW PRODUCT: (/products/create)
productsRoute
	.route('/create')
	.post(
		productBodyValidationRules,
		validateRequest,
		authenticateUserToken,
		productsController.createController
	);

// READ ALL PRODUCTS: (/products)
productsRoute
	.route('/')
	.get(authenticateUserToken, productsController.showAllController);

// MANIPULATE SPECIFIC PRODUCT: (/:productID)
productsRoute
	.route('/:productID')
	// READ: (/products/:productID)
	.get(
		productParamsValidationRules,
		validateRequest,
		authenticateUserToken,
		productsController.showController
	)
	// UPDATE: (/products/:productID)
	.put(
		productParamsValidationRules,
		productBodyValidationRules,
		validateRequest,
		authenticateUserToken,
		productsController.updateController
	)
	// DELETE: (/products/:productID)
	.delete(
		productParamsValidationRules,
		validateRequest,
		authenticateUserToken,
		productsController.deleteController
	);

export default productsRoute;
