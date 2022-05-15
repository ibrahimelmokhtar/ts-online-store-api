import { PoolClient } from 'pg';
import pool from '../database';
import OrdersPerUser from '../types/dashboard/ordersPerUser.type';
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

	showOrdersPerUser = async (
		userID: string
	): Promise<Array<OrdersPerUser> | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			const sql: string = `
				SELECT orders.id AS order_id, orders.is_done, orders.date_time_readable, SUM(order_products.product_quantity*products.price) AS total_cost
				FROM orders
				INNER JOIN users ON orders.user_id=users.id
				INNER JOIN order_products ON orders.id=order_products.order_id
				INNER JOIN products ON order_products.product_id=products.id
				WHERE users.id=($1)::UUID
				GROUP BY orders.id
				ORDER BY orders.date_time DESC, total_cost DESC
				LIMIT 5`;
			const result = await client.query(sql, [userID]);

			// release connection:
			client.release();

			// return a specific user orders:
			return result.rows;
		} catch (error) {
			console.error(
				`Dashboard Services: Unable to show orders per user: ${
					(error as Error).message
				}`
			);
		}
	};
}

export default Dashboard;
