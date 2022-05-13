import { PoolClient } from 'pg';
import pool from '../database';
import ProductsInOrder from '../types/dashboard/productsInOrder.type';

class Dashboard {
	showProductsInOrders = async (): Promise<Array<ProductsInOrder> | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			const sql: string = `
				SELECT order_products.order_id, orders.is_done AS is_order_done, orders.date_time AS order_date_time, orders.date_time_readable AS order_date_time_readable, orders.user_id, users.user_name,  products.name AS product_name, products.category AS product_category, products.price AS product_price, order_products.product_quantity, (price*product_quantity) AS total_price
				FROM order_products
				INNER JOIN orders ON orders.id=order_products.order_id
				INNER JOIN users ON orders.user_id=users.id
				INNER JOIN products ON products.id=order_products.product_id
				ORDER BY total_price DESC, user_name ASC, order_date_time DESC, is_order_done DESC`;
			const result = await client.query(sql);

			// release connection:
			client.release();

			// return a specific order products:
			return result.rows;
		} catch (error) {
			console.error(
				`Dashboard Services: Unable to show products in orders: ${
					(error as Error).message
				}`
			);
		}
	};
}

export default Dashboard;
