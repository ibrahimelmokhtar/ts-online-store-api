import { Request, Response } from 'express';
import Order from '../types/order.type';
import OrderModel from '../models/order.model';

// create new object from OrderModel:
const orderModel = new OrderModel();

/**
 * @description Check order existence within the database via specific info (id).
 * @param {Request} req
 * @returns {boolean} Order's existence status (true: is found, false: is NOT found).
 */
export const checkExistenceController = async (
	req: Request
): Promise<boolean | void> => {
	try {
		// check req.body values to see if (order_id) key exists:
		const orderIdWithinBody: boolean = req.body.order_id ? true : false;
		let info: string = req.body.order_id;

		// extract search keyword:
		let idWithinBody: boolean = false;
		if (!orderIdWithinBody) {
			// check req.body values to see if (id) key exists:
			idWithinBody = req.body.id ? true : false;
			info = req.body.id;

			if (!idWithinBody) {
				// extract orderID from req.params:
				info = req.params.orderID;
			}
		}

		// check user's existence:
		const isFound: boolean = (await orderModel.checkOrderExistence(
			info
		)) as boolean;

		return isFound;
	} catch (error) {
		console.error(
			`Order Controller: Error while checking order: ${
				(error as Error).message
			}`
		);
	}
};

export const checkStatusController = async (
	req: Request
): Promise<boolean | void> => {
	try {
		/**
		 * 1. check (req.body) to see if (order_id) exists:
		 * 		- if exists:
		 * 			- SET (orderIdWithinBody) to true
		 * 	  		- SET (info) to (req.body.order_id)
		 * 			- JUMP INTO STEP #4
		 * 		- NOTE: this means that we are NOW inside orderProducts controller.
		 *
		 * 2. check (req.body) to see if (id) exists:
		 * 		- if exists:
		 * 			- SET (idWithinBody) to true
		 * 	  		- SET (info) to (req.body.id)
		 * 			- JUMP INTO STEP #4
		 * 		- NOTE: this means that we are NOW inside products controller.
		 *
		 * 3. ELSE:
		 * 	  	- SET (info) to (req.params.orderID)
		 * 		- CONTINUE WITH STEP #4
		 *
		 * 4. Pass collected data to the model.
		 */

		// check req.body values to see if (order_id) key exists:
		const orderIdWithinBody: boolean = req.body.order_id ? true : false;
		let info: string = req.body.order_id;

		// extract search keyword:
		let idWithinBody: boolean = false;
		if (!orderIdWithinBody) {
			// check req.body values to see if (id) key exists:
			idWithinBody = req.body.id ? true : false;
			info = req.body.id;

			if (!idWithinBody) {
				// extract orderID from req.params:
				info = req.params.orderID;
			}
		}

		// check order's status:
		const isCompleted: boolean = (await orderModel.checkOrderStatus(
			info
		)) as boolean;

		return isCompleted;
	} catch (error) {
		console.error(
			`Order Controller: Error while checking order status: ${
				(error as Error).message
			}`
		);
	}
};

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
		// check order's existence:
		const isFound: boolean = (await checkExistenceController(
			req
		)) as unknown as boolean;

		if (isFound) {
			res.status(409)
				.json({
					status: 'Error 409: Conflict',
					message: 'Order id already exists.',
				})
				.end();
			return;
		}

		// use order model to create the new Order object ...
		// then save it within a specific DB table:
		const order: Order = (await orderModel.create(req.body)) as Order;

		// send a response back to the order:
		res.status(201)
			.json({
				status: '201 Created',
				order: order,
				message: 'Order created successfully.',
			})
			.end();
		return;
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
		// check order's existence:
		const isFound: boolean = (await checkExistenceController(
			req
		)) as unknown as boolean;

		if (!isFound) {
			res.status(404)
				.json({
					status: 'Error 404: Not Found',
					message: 'Order is NOT found.',
				})
				.end();
			return;
		}

		// use order model to show a specific Order object:
		const order: Order = (await orderModel.show(
			req.params.orderID
		)) as Order;

		// send a response back to the order:
		res.status(200)
			.json({
				status: '200 Ok',
				order: order,
				message: 'Order shown successfully.',
			})
			.end();
		return;
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
		res.status(200)
			.json({
				status: '200 Ok',
				totalOrders: orders?.length,
				orders: orders,
				message: 'Orders shown successfully.',
			})
			.end();
		return;
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
		// check order's existence:
		const isFound: boolean = (await checkExistenceController(
			req
		)) as unknown as boolean;

		if (!isFound) {
			res.status(404)
				.json({
					status: 'Error 404: Not Found',
					message: 'Order is NOT found.',
				})
				.end();
			return;
		}

		// check order's status:
		const isCompleted: boolean = (await checkStatusController(
			req
		)) as unknown as boolean;

		if (isCompleted) {
			res.status(405)
				.json({
					status: 'Error 405: Method Not Allowed',
					message: 'Order had been completed.',
				})
				.end();
			return;
		}

		// use order model to update a specific Order object ...
		// then save it within a specific DB table:
		const order: Order = (await orderModel.updateOrderStatus(
			req.params.orderID,
			req.body.is_done
		)) as Order;

		// send a response back to the order:
		res.status(200)
			.json({
				status: '200 Ok',
				order: order,
				message: 'Order status updated successfully.',
			})
			.end();
		return;
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
		// check order's existence:
		const isFound: boolean = (await checkExistenceController(
			req
		)) as unknown as boolean;

		if (!isFound) {
			res.status(404)
				.json({
					status: 'Error 404: Not Found',
					message: 'Order is NOT found.',
				})
				.end();
			return;
		}

		// use order model to delete a specific Order object:
		const order: Order = (await orderModel.delete(
			req.params.orderID
		)) as Order;

		// send a response back to the order:
		res.status(200)
			.json({
				status: '200 Ok',
				order: order,
				message: 'Order deleted successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`Order Controller: Error while deleting order: ${
				(error as Error).message
			}`
		);
	}
};
