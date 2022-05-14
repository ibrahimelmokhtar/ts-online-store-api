import { Request, Response } from 'express';
import ProductModel from '../models/product.model';
import Product from '../types/product.type';

// create new object from ProductModel:
const productModel = new ProductModel();

/**
 * @description Check product existence within the database via specific info (name or id).
 * @param {Request} req
 * @returns {boolean} Product's existence status (true: is found, false: is NOT found).
 */
export const checkExistenceController = async (
	req: Request
): Promise<boolean | void> => {
	try {
		/**
		 * 1. SET (isName) to false
		 *
		 * 2. check (req.body) to see if (product_id) exists:
		 * 		- if exists:
		 * 			- SET (productIdWithinBody) to true
		 * 	  		- SET (info) to (req.body.product_id)
		 * 			- JUMP INTO STEP #5
		 * 		- NOTE: this means that we are NOW inside orderProducts controller.
		 *
		 * 3. check (req.params) to see if (productID) exists:
		 * 		- if exists:
		 * 			- SET (productIdWithinBody) to true
		 * 	  		- SET (info) to (req.params.productID)
		 * 			- JUMP INTO STEP #5
		 * 		- NOTE: this means that we are NOW inside products controller.
		 *
		 * 4. ELSE:
		 * 	  	- SET (info) to (req.body.name)
		 * 		- SET (isName) to true
		 * 		- CONTINUE WITH STEP #5
		 *
		 * 5. Pass collected data to the model.
		 */

		// check req.body values to see if (product_id) key exists:
		const productIdWithinBody: boolean = req.body.product_id ? true : false;
		let info: string = req.body.product_id;

		// extract search keyword:
		let isName: boolean = false;
		let productIdWithinParams: boolean = false;
		if (!productIdWithinBody) {
			// check req.params values to see if (productID) key exists:
			productIdWithinParams = req.params.productID ? true : false;
			info = req.params.productID;

			if (!productIdWithinParams) {
				// extract name from req.body:
				info = req.body.name;
				isName = true;
			}
		}

		// check product's existence:
		const isFound: boolean = (await productModel.checkProductExistence(
			info,
			isName
		)) as boolean;

		return isFound;
	} catch (error) {
		console.error(
			`Product Controller: Error while checking product: ${
				(error as Error).message
			}`
		);
	}
};

/**
 * @description Create new Product object then save it within the database.
 * @param {Request} req
 * @param {Response} res
 */
export const createController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// check product's existence:
		const isFound: boolean = (await checkExistenceController(
			req
		)) as unknown as boolean;

		if (isFound) {
			res.status(409)
				.json({
					status: 'Error 409: Conflict',
					message: 'Product name already exists.',
				})
				.end();
			return;
		}

		// use product model to create the new Product object ...
		// then save it within a specific DB table:
		const product: Product = (await productModel.create(
			req.body
		)) as Product;

		// handle unexpected error:
		if (!product) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					product: {},
					message: `Unable to create product with name: ${req.body.name}`,
				})
				.end();
			return;
		}

		// send a response back to the user:
		res.status(201)
			.json({
				status: '201 Created',
				product: product,
				message: 'Product created successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`Product Controller: Error while creating new product: ${
				(error as Error).message
			}`
		);
	}
};

/**
 * @description Show a specific Product object from the database.
 * @param {Request} req
 * @param {Response} res
 */
export const showController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// check product's existence:
		const isFound: boolean = (await checkExistenceController(
			req
		)) as unknown as boolean;

		if (!isFound) {
			res.status(404)
				.json({
					status: 'Error 404: Not Found',
					message: 'Product is NOT found.',
				})
				.end();
			return;
		}

		// use product model to show a specific Product object:
		const product: Product = (await productModel.show(
			req.params.productID
		)) as Product;

		// handle unexpected error:
		if (!product) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					product: {},
					message: `Unable to show product no. ${req.params.productID}`,
				})
				.end();
			return;
		}

		// send a response back to the user:
		res.status(200)
			.json({
				status: '200 Ok',
				product: product,
				message: 'Product shown successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`Product Controller: Error while showing product: ${
				(error as Error).message
			}`
		);
	}
};

/**
 * @description Show all Product objects from the database.
 * @param {Request} _req
 * @param {Response} res
 */
export const showAllController = async (
	_req: Request,
	res: Response
): Promise<void> => {
	try {
		// use product model to show all Product objects:
		const products: Array<Product> =
			(await productModel.showAll()) as Array<Product>;

		// handle unexpected error:
		if (!products) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					products: {},
					message: 'Unable to show products.',
				})
				.end();
			return;
		}

		// send a response back to the user:
		res.status(200)
			.json({
				status: '200 Ok',
				totalProducts: products?.length,
				products: products,
				message: 'Products shown successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`Product Controller: Error while showing products: ${
				(error as Error).message
			}`
		);
	}
};

/**
 * @description Update a specific Product object then save it within the database.
 * @param {Request} req
 * @param {Response} res
 */
export const updateController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// check product's existence:
		const isFound: boolean = (await checkExistenceController(
			req
		)) as unknown as boolean;

		if (!isFound) {
			res.status(404)
				.json({
					status: 'Error 404: Not Found',
					message: 'Product is NOT found.',
				})
				.end();
			return;
		}

		// use product model to update a specific Product object ...
		// then save it within a specific DB table:
		const product: Product = (await productModel.update(
			req.params.productID,
			req.body
		)) as Product;

		// handle unexpected error:
		if (!product) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					product: {},
					message: `Unable to update product no. ${req.params.productID}`,
				})
				.end();
			return;
		}

		// send a response back to the user:
		res.status(200)
			.json({
				status: '200 Ok',
				product: product,
				message: 'Product updated successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`Product Controller: Error while updating product: ${
				(error as Error).message
			}`
		);
	}
};

/**
 * @description Delete a specific Product object from the database.
 * @param {Request} req
 * @param {Response} res
 */
export const deleteController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// check product's existence:
		const isFound: boolean = (await checkExistenceController(
			req
		)) as unknown as boolean;

		if (!isFound) {
			res.status(404)
				.json({
					status: 'Error 404: Not Found',
					message: 'Product is NOT found.',
				})
				.end();
			return;
		}

		// use product model to delete a specific Product object:
		const product: Product = (await productModel.delete(
			req.params.productID
		)) as Product;

		// handle unexpected error:
		if (!product) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					product: {},
					message: `Unable to delete product no. ${req.params.productID}`,
				})
				.end();
			return;
		}

		// send a response back to the user:
		res.status(200)
			.json({
				status: '200 Ok',
				product: product,
				message: 'Product deleted successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`Product Controller: Error while deleting product: ${
				(error as Error).message
			}`
		);
	}
};
