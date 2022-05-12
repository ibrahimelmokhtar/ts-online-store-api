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
		// check req.body values to see if (name) key exists:
		const isName: boolean = req.body.name ? true : false;

		// extract search keyword:
		let info: string = req.body.name;
		if (!isName) {
			info = req.params.productID;
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

		// send a response back to the product:
		res.status(201)
			.json({
				status: '201 Created',
				data: product,
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

		// send a response back to the product:
		res.status(200)
			.json({
				status: '200 Ok',
				data: product,
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

		// send a response back to the product:
		res.status(200)
			.json({
				status: '200 Ok',
				totalProducts: products?.length,
				data: products,
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

		// send a response back to the product:
		res.status(200)
			.json({
				status: '200 Ok',
				data: product,
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

		// send a response back to the product:
		res.status(200)
			.json({
				status: '200 Ok',
				data: product,
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
