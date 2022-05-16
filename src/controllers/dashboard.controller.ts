import { Request, Response } from 'express';
import Dashboard from '../services/dashboard.services';
import OrdersPerUser from '../types/dashboard/ordersPerUser.type';
import ProductsInOrder from '../types/dashboard/productsInOrder.type';
import TopProduct from '../types/dashboard/topProduct.type';

// create new object from Dashboard:
const dashboard = new Dashboard();

/**
 * @description Show products in orders.
 * @param {Request} _req
 * @param {Response} res
 */
export const showProductsInOrdersController = async (
	_req: Request,
	res: Response
): Promise<void> => {
	try {
		// use productsInOrders model to show all ProductsInOrder objects:
		const productsInOrders: Array<ProductsInOrder> =
			(await dashboard.showProductsInOrders()) as Array<ProductsInOrder>;

		// handle unexpected error:
		if (!productsInOrders) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					productsInOrders: {},
					message: 'Unable to show products in orders.',
				})
				.end();
			return;
		}

		// send a response back to the user:
		res.status(200)
			.json({
				status: '200 Ok',
				totalProductsInOrders: productsInOrders.length,
				productsInOrders: productsInOrders,
				message: 'Products in orders shown successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`Dashboard Controller: Error while showing products in orders: ${
				(error as Error).message
			}`
		);
	}
};

/**
 * @description Show recent orders per user.
 * @param {Request} req
 * @param {Response} res
 */
export const showRecentOrdersPerUserController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// obtain (userID) from (req.params):
		const userID: string = req.params.userID;

		// use OrdersPerUser model to show all OrdersPerUser objects:
		const ordersPerUser: Array<OrdersPerUser> =
			(await dashboard.showOrdersPerUser(userID)) as Array<OrdersPerUser>;

		// handle unexpected error:
		if (!ordersPerUser) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					ordersPerUser: {},
					message: 'Unable to show orders per user.',
				})
				.end();
			return;
		}

		// send a response back to the user:
		res.status(200)
			.json({
				status: '200 Ok',
				recentOrders: ordersPerUser,
				message: 'Orders per user shown successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`Dashboard Controller: Error while showing orders per user: ${
				(error as Error).message
			}`
		);
	}
};

/**
 * @description Show top ordered products.
 * @param {Request} _req
 * @param {Response} res
 */
export const showTopProductsController = async (
	_req: Request,
	res: Response
): Promise<void> => {
	try {
		// use TopProducts model to show top TopProducts objects:
		const topProducts: Array<TopProduct> =
			(await dashboard.showTopProducts()) as Array<TopProduct>;

		// handle unexpected error:
		if (!topProducts) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					topProducts: {},
					message: 'Unable to show top products.',
				})
				.end();
			return;
		}

		// send a response back to the user:
		res.status(200)
			.json({
				status: '200 Ok',
				topProducts: topProducts,
				message: 'Top products shown successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`Dashboard Controller: Error while showing top products: ${
				(error as Error).message
			}`
		);
	}
};
