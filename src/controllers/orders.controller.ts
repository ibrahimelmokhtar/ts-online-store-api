import { DEFAULT_ORDER } from '../constants/order.type.constant';
import { Request, Response } from 'express';
import Order from '../types/order.type';
import OrderModel from '../models/order.model';

// create new object from OrderModel:
const orderModel = new OrderModel();

/**
 * @description Create new Order object then save it within the database.
 * @param {Request} req
 * @param {Response} res
 */
export const createController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// use DEFAULT_ORDER while testing:
		if (process.env.NODE_ENV === 'test') {
			req.body = DEFAULT_ORDER;
		}

		// use order model to create the new Order object ...
		// then save it within a specific DB table:
		const order: Order = (await orderModel.create(req.body)) as Order;

		// send a response back to the order:
		res.json({
			status: 'success',
			data: order,
			message: 'Order created successfully.',
		}).end();
	} catch (error) {
		console.error(
			`Order Controller: Error while creating new order: ${
				(error as Error).message
			}`
		);
	}
};

/**
 * @description Show a specific Order object from the database.
 * @param {Request} req
 * @param {Response} res
 */
export const showController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// use order model to show a specific Order object:
		const order: Order = (await orderModel.show(req.params.id)) as Order;

		// send a response back to the order:
		res.json({
			status: 'success',
			data: order,
			message: 'Order shown successfully.',
		}).end();
	} catch (error) {
		console.error(
			`Order Controller: Error while showing order: ${
				(error as Error).message
			}`
		);
	}
};

/**
 * @description Show all Order objects from the database.
 * @param {Request} _req
 * @param {Response} res
 */
export const showAllController = async (
	_req: Request,
	res: Response
): Promise<void> => {
	try {
		// use order model to show all Order objects:
		const orders: Array<Order> =
			(await orderModel.showAll()) as Array<Order>;

		// send a response back to the order:
		res.json({
			status: 'success',
			totalOrders: orders?.length,
			data: orders,
			message: 'Orders shown successfully.',
		}).end();
	} catch (error) {
		console.error(
			`Order Controller: Error while showing orders: ${
				(error as Error).message
			}`
		);
	}
};

/**
 * @description Update a specific Order object then save it within the database.
 * @param {Request} req
 * @param {Response} res
 */
export const updateController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// use DEFAULT_ORDER while testing:
		if (process.env.NODE_ENV === 'test') {
			req.body = DEFAULT_ORDER;
		}

		// use order model to update a specific Order object ...
		// then save it within a specific DB table:
		const order: Order = (await orderModel.update(
			req.params.id,
			req.body
		)) as Order;

		// send a response back to the order:
		res.json({
			status: 'success',
			data: order,
			message: 'Order updated successfully.',
		}).end();
	} catch (error) {
		console.error(
			`Order Controller: Error while updating order: ${
				(error as Error).message
			}`
		);
	}
};

/**
 * @description Delete a specific Order object from the database.
 * @param {Request} req
 * @param {Response} res
 */
export const deleteController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// use order model to delete a specific Order object:
		const order: Order = (await orderModel.delete(req.params.id)) as Order;

		// send a response back to the order:
		res.json({
			status: 'success',
			data: order,
			message: 'Order deleted successfully.',
		}).end();
	} catch (error) {
		console.error(
			`Order Controller: Error while deleting order: ${
				(error as Error).message
			}`
		);
	}
};
