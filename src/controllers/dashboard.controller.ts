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

		// send a response back to the product:
		res.json({
			status: 'success',
			totalProductsInOrders: productsInOrders.length,
			data: productsInOrders,
			message: 'Products in orders shown successfully.',
		});
	} catch (error) {
		console.error(
			`Dashboard Controller: Error while showing products in orders: ${
				(error as Error).message
			}`
		);
	}
};
