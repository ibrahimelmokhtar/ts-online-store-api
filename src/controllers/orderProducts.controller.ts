import { Request, Response } from 'express';
import OrderProductModel from '../models/orderProduct.model';
// import Order from '../types/order.type';
import OrderProduct from '../types/orderProduct.type';
// import OrderProduct from '../types/orderProduct.type';

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
		// use orderProduct model to create the new OrderProduct object ...
		// then save it within a specific DB table:
		const orderProduct: OrderProduct = (await orderProductModel.addProduct(
			req.params.orderID as string,
			req.body
		)) as OrderProduct;

		// send a response back to the product:
		res.json({
			status: 'success',
			data: orderProduct,
			message: 'Product added successfully to the order.',
		});
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
		res.json({
			status: 'success',
			data: orderProduct,
			message: 'Product shown successfully from the order.',
		});
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
		res.json({
			status: 'success',
			totalProductsInOrder: orderProducts.length,
			data: orderProducts,
			message: 'Products shown successfully from the order.',
		});
	} catch (error) {
		console.error(
			`OrderProduct Controller: Error while showing products from order: ${
				(error as Error).message
			}`
		);
	}
};
