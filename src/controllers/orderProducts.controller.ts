import { Request, Response } from 'express';
import OrderProductModel from '../models/orderProduct.model';
import OrderProduct from '../types/orderProduct.type';
import * as productsController from './products.controller';
import * as ordersController from './orders.controller';

// create new object from OrderProductModel:
const orderProductModel = new OrderProductModel();

/**
 * @description Add new Product into specific Order.
 * @param {Request} req
 * @param {Response} res
 */
export const addProductController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// check product's existence:
		const isProductFound: boolean =
			(await productsController.checkExistenceController(
				req
			)) as unknown as boolean;

		if (!isProductFound) {
			res.status(404)
				.json({
					status: 'Error 404: Not Found',
					message: 'Product is NOT found.',
				})
				.end();
			return;
		}

		// check order's existence:
		const isOrderFound: boolean =
			(await ordersController.checkExistenceController(
				req
			)) as unknown as boolean;

		if (!isOrderFound) {
			res.status(404)
				.json({
					status: 'Error 404: Not Found',
					message: 'Order is NOT found.',
				})
				.end();
			return;
		}

		// check order's status:
		const isOrderCompleted: boolean =
			(await ordersController.checkStatusController(
				req
			)) as unknown as boolean;

		if (isOrderCompleted) {
			res.status(405)
				.json({
					status: 'Error 405: Method Not Allowed',
					message: 'Order had been completed.',
				})
				.end();
			return;
		}

		// use orderProduct model to create the new OrderProduct object ...
		// then save it within a specific DB table:
		const orderProduct: OrderProduct = (await orderProductModel.addProduct(
			req.params.orderID as string,
			req.body
		)) as OrderProduct;

		// send a response back to the product:
		res.status(200)
			.json({
				status: '200 Ok',
				orderProduct: orderProduct,
				message: 'Product added successfully to the order.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`OrderProduct Controller: Error while adding new product to order: ${
				(error as Error).message
			}`
		);
	}
};

/**
 * @description Show specific Product from specific Order.
 * @param {Request} req
 * @param {Response} res
 */
export const showProductController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// use orderProduct model to show a specific OrderProduct object:
		const orderProduct: OrderProduct = (await orderProductModel.showProduct(
			req.params.orderID,
			req.params.productID
		)) as OrderProduct;

		// send a response back to the product:
		res.status(200)
			.json({
				status: '200 Ok',
				orderProduct: orderProduct,
				message: 'Product shown successfully from the order.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`OrderProduct Controller: Error while showing product from order: ${
				(error as Error).message
			}`
		);
	}
};

/**
 * @description Show all Products from specific Order.
 * @param {Request} req
 * @param {Response} res
 */
export const showAllProductsController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// use orderProduct model to show all OrderProduct objects:
		const orderProducts: Array<OrderProduct> =
			(await orderProductModel.showAllProducts(
				req.params.orderID
			)) as Array<OrderProduct>;

		// send a response back to the product:
		res.status(200)
			.json({
				status: '200 Ok',
				totalProductsInOrder: orderProducts.length,
				orderProducts: orderProducts,
				message: 'Products shown successfully from the order.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`OrderProduct Controller: Error while showing products from order: ${
				(error as Error).message
			}`
		);
	}
};
