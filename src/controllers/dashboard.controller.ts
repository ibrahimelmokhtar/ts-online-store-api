import { Request, Response } from 'express';
import Dashboard from '../services/dashboard.services';
import ProductsInOrder from '../types/dashboard/productsInOrder.type';

// create new object from Dashboard:
const dashboard = new Dashboard();

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
