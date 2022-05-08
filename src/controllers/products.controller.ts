import { DEFAULT_PRODUCT } from '../constants/product.type.constant';
import { Request, Response } from 'express';
import ProductModel from '../models/product.model';
import Product from '../types/product.type';

// create new object from ProductModel:
const productModel = new ProductModel();

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
		// use DEFAULT_PRODUCT while testing:
		if (process.env.NODE_ENV === 'test') {
			req.body = DEFAULT_PRODUCT;
		}

		// use product model to create the new Product object ...
		// then save it within a specific DB table:
		const product: Product = (await productModel.create(
			req.body
		)) as Product;

		// send a response back to the product:
		res.json({
			status: 'success',
			data: product,
			message: 'Product created successfully.',
		}).end();
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
		// use product model to show a specific Product object:
		const product: Product = (await productModel.show(
			req.params.id
		)) as Product;

		// send a response back to the product:
		res.json({
			status: 'success',
			data: product,
			message: 'Product shown successfully.',
		}).end();
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
		res.json({
			status: 'success',
			totalProducts: products?.length,
			data: products,
			message: 'Products shown successfully.',
		}).end();
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
		// use DEFAULT_PRODUCT while testing:
		if (process.env.NODE_ENV === 'test') {
			req.body = DEFAULT_PRODUCT;
		}

		// use product model to update a specific Product object ...
		// then save it within a specific DB table:
		const product: Product = (await productModel.update(
			req.params.id,
			req.body
		)) as Product;

		// send a response back to the product:
		res.json({
			status: 'success',
			data: product,
			message: 'Product updated successfully.',
		}).end();
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
		// use product model to delete a specific Product object:
		const product: Product = (await productModel.delete(
			req.params.id
		)) as Product;

		// send a response back to the product:
		res.json({
			status: 'success',
			data: product,
			message: 'Product deleted successfully.',
		}).end();
	} catch (error) {
		console.error(
			`Product Controller: Error while deleting product: ${
				(error as Error).message
			}`
		);
	}
};
