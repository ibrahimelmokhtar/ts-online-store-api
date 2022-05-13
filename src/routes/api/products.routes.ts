import { Router } from 'express';
import * as productsController from '../../controllers/products.controller';
import { authenticateUser } from '../../middlewares/authentication.middleware';
import validateRequest from '../../middlewares/validation.middleware';
import {
	productBodyValidationRules,
	productParamsValidationRules,
} from '../../schemas/products.schemas';

// create Express Router:
const productsRoute: Router = Router();

// CREATE NEW PRODUCT: (/products/create)
productsRoute
	.route('/create')
	.post(
		productBodyValidationRules,
		validateRequest,
		authenticateUser,
		productsController.createController
	);

// READ ALL PRODUCTS: (/products)
productsRoute
	.route('/')
	.get(authenticateUser, productsController.showAllController);

// MANIPULATE SPECIFIC PRODUCT: (/:productID)
productsRoute
	.route('/:productID')
	// READ: (/products/:productID)
	.get(
		productParamsValidationRules,
		validateRequest,
		authenticateUser,
		productsController.showController
	)
	// UPDATE: (/products/:productID)
	.put(
		productParamsValidationRules,
		productBodyValidationRules,
		validateRequest,
		authenticateUser,
		productsController.updateController
	)
	// DELETE: (/products/:productID)
	.delete(
		productParamsValidationRules,
		validateRequest,
		authenticateUser,
		productsController.deleteController
	);

export default productsRoute;
