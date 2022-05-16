import { PoolClient } from 'pg';
import pool from '../database';
import ProductsInOrder from '../types/dashboard/productsInOrder.type';
import OrdersPerUser from '../types/dashboard/ordersPerUser.type';
import TopProduct from '../types/dashboard/topProduct.type';

class Dashboard {
	/**
	 * @description Obtain products within orders.
	 * @returns {Array<ProductsInOrder} List of products within orders
	 */
	showProductsInOrders = async (): Promise<Array<ProductsInOrder> | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			const sql: string = `
				SELECT 	order_products.order_id::UUID,
						orders.is_done::BOOLEAN AS is_order_done,
						orders.date_time::TIMESTAMPTZ AS order_date_time,
						orders.date_time_readable::VARCHAR AS order_date_time_readable,
						orders.user_id::UUID,
						users.user_name::VARCHAR,
						products.name::VARCHAR AS product_name,
						products.category::VARCHAR AS product_category,
						products.price::FLOAT AS product_price,
						order_products.product_quantity::INTEGER,
						(price*product_quantity)::FLOAT AS total_price
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

	/**
	 * @description Obtain orders per user.
	 * @param {string} userID
	 * @returns {Array<OrdersPerUser>} List of orders per user.
	 */
	showOrdersPerUser = async (
		userID: string
	): Promise<Array<OrdersPerUser> | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			const sql: string = `
				SELECT 	orders.id::UUID AS order_id,
						orders.is_done::BOOLEAN,
						orders.date_time_readable::VARCHAR,
						SUM(order_products.product_quantity*products.price)::FLOAT AS total_cost
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

	/**
	 * @description Obtain top ordered products.
	 * @returns {Array<TopProduct>} List of top products.
	 */
	showTopProducts = async (): Promise<Array<TopProduct> | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			const sql: string = `
				SELECT 	order_products.product_id::UUID AS product_id,
						products.name::VARCHAR AS product_name,
						SUM(order_products.product_quantity)::INTEGER AS product_quantity,
						COUNT(product_id)::INTEGER AS x_orders
				FROM order_products
				INNER JOIN products ON order_products.product_id=products.id
				GROUP BY product_id, product_name
				ORDER BY product_quantity DESC, x_orders DESC, product_id ASC
				LIMIT 5`;
			const result = await client.query(sql);

			// release connection:
			client.release();

			// return a specific user orders:
			return result.rows;
		} catch (error) {
			console.error(
				`Dashboard Services: Unable to show top products: ${
					(error as Error).message
				}`
			);
		}
	};
}

export default Dashboard;
