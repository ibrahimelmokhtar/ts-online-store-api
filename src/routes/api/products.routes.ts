import { Request, Response, Router } from 'express';
import { DEFAULT_PRODUCT } from '../../constants/product.type.constant';
import { DEFAULT_USER } from '../../constants/user.type.constant';
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
 * Render Pages:
 */

// MAIN PRODUCTS VIEW:
// SHOW ALL PRODUCTS:
productsRoute.route('/').get((_req: Request, res: Response) => {
	res.status(200).render('pages/products/showAllProducts.ejs', {
		user: DEFAULT_USER,
		product: DEFAULT_PRODUCT,
	});
	return;
});

// ADD NEW PRODUCT:
productsRoute.route('/add').get((_req: Request, res: Response) => {
	res.status(200).render('pages/products/addProduct.ejs', {
		user: DEFAULT_USER,
		product: DEFAULT_PRODUCT,
	});
	return;
});

// SHOW SPECIFIC PRODUCT:
productsRoute.route('/show').get((_req: Request, res: Response) => {
	res.status(200).render('pages/products/showProduct.ejs', {
		user: DEFAULT_USER,
		product: DEFAULT_PRODUCT,
	});
	return;
});

// UPDATE SPECIFIC PRODUCT:
productsRoute.route('/update').get((_req: Request, res: Response) => {
	res.status(200).render('pages/products/updateProduct.ejs', {
		user: DEFAULT_USER,
		product: DEFAULT_PRODUCT,
	});
	return;
});

// DELETE SPECIFIC PRODUCT:
productsRoute.route('/delete').get((_req: Request, res: Response) => {
	res.status(200).render('pages/products/deleteProduct.ejs', {
		user: DEFAULT_USER,
		product: DEFAULT_PRODUCT,
	});
	return;
});

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
