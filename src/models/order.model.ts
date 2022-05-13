import pool from '../database';
import { PoolClient } from 'pg';
import Order from '../types/order.type';

class OrderModel {
	/**
	 * @description Check order existence within the database via specific info (id).
	 * @param {string} info
	 * @returns {boolean} Order's existence status (true: is found, false: is NOT found).
	 */
	checkOrderExistence = async (info: string): Promise<boolean | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			const sql: string = 'SELECT * FROM orders WHERE id=($1)::UUID';
			const result = await client.query(sql, [info]);

			// release connection:
			client.release();

			let isFound = false;
			if (result.rows[0]) {
				isFound = true;
			}

			// return order status:
			return isFound;
		} catch (error) {
			console.error(
				`Order Model: Unable to check ${info}: ${
					(error as Error).message
				}`
			);
		}
	};

	/**
	 * @description Check specific order's status.
	 * @param {string} orderID
	 * @returns {boolean} Order's status (true: is completed, false: is NOT completed [still active]).
	 */
	checkOrderStatus = async (orderID: string): Promise<boolean | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			const sql: string = 'SELECT * FROM orders WHERE id=($1)';
			const result = await client.query(sql, [orderID]);

			// release connection:
			client.release();

			// return a specific order's status:
			return result.rows[0]['is_done'];
		} catch (error) {
			console.error(
				`Order Model: Unable to check order status ${orderID}: ${
					(error as Error).message
				}`
			);
		}
	};

	/**
	 * @description Create new Order within the database.
	 * @param {Order} order
	 * @returns {Order} Created Order object.
	 */
	create = async (order: Order): Promise<Order | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			let sql: string = 'EMPTY SQL QUERY';
			let sentValues: Array<
				string | boolean | number | Date | Array<string | number>
			> = [];

			// add products into orders table:
			if (process.env.NODE_ENV === 'test') {
				sql =
					'INSERT INTO orders (id, is_done, user_id, products_ids, products_quantities, date_time, date_time_readable) VALUES ($1::UUID, $2::BOOLEAN, $3::UUID, $4::UUID[], $5::INTEGER[], $6::TIMESTAMPTZ, $7::VARCHAR) RETURNING *';
				sentValues = [
					order.id as string,
					order.is_done,
					order.user_id as string,
					order.products_ids,
					order.products_quantities,
					order.date_time as string,
					order.date_time_readable as string,
				];
			} else {
				sql =
					'INSERT INTO orders (is_done, user_id, products_ids, products_quantities, date_time, date_time_readable) VALUES ($1::BOOLEAN, $2::UUID, $3::UUID[], $4::INTEGER[], $5::TIMESTAMPTZ, $6::VARCHAR) RETURNING *';
				sentValues = [
					order.is_done,
					order.user_id as string,
					order.products_ids,
					order.products_quantities,
					order.date_time as string,
					order.date_time_readable as string,
				];
			}

			// run desired query:
			const result = await client.query(sql, sentValues);

			// THEN: add products into order_products table:
			for (let i = 0; i < order.products_ids.length; i++) {
				sql =
					'INSERT INTO order_products (order_id, product_id, product_quantity, date_time, date_time_readable) VALUES ($1::UUID, $2::UUID, $3::INTEGER, $4::TIMESTAMPTZ, $5::VARCHAR) RETURNING *';
				sentValues = [
					result.rows[0]['id'],
					order.products_ids[i],
					order.products_quantities[i],
					order.date_time,
					order.date_time_readable,
				];

				// run desired query:
				await client.query(sql, sentValues);
			}

			// release connection:
			client.release();

			// return a specific order:
			return result.rows[0];
		} catch (error) {
			console.error(
				`Order Model: Unable to create order for user ${
					order.user_id
				}: ${(error as Error).message}`
			);
		}
	};

	/**
	 * @description Show a specific Order from the database.
	 * @param {string} orderID
	 * @returns {Order} Desired Order object.
	 */
	show = async (orderID: string): Promise<Order | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			const sql: string = 'SELECT * FROM orders WHERE id=($1)::UUID';
			const result = await client.query(sql, [orderID]);

			// release connection:
			client.release();

			// return a specific order:
			return result.rows[0];
		} catch (error) {
			console.error(
				`Order Model: Unable to show ${orderID}: ${
					(error as Error).message
				}`
			);
		}
	};

	/**
	 * @description Show all Order objects from the database.
	 * @returns {Array<Order>} Array of Order objects.
	 */
	showAll = async (): Promise<Array<Order> | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			const sql: string = 'SELECT * FROM orders';
			const result = await client.query(sql);

			// release connection:
			client.release();

			// return all orders:
			return result.rows;
		} catch (error) {
			console.error(
				`Order Model: Unable to show orders: ${
					(error as Error).message
				}`
			);
		}
	};

	/**
	 * @description Update a specific Order object.
	 * @param {string} orderID
	 * @param {boolean} orderStatus
	 * @returns {Order} Updated Order object.
	 */
	updateOrderStatus = async (
		orderID: string,
		orderStatus: boolean
	): Promise<Order | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			const sql: string =
				'UPDATE orders SET is_done=($2)::BOOLEAN WHERE id=($1)::UUID RETURNING *';
			const result = await client.query(sql, [orderID, orderStatus]);

			// release connection:
			client.release();

			// return updated order:
			return result.rows[0];
		} catch (error) {
			console.error(
				`Order Model: Unable to update ${orderID}: ${
					(error as Error).message
				}`
			);
		}
	};

	/**
	 * @description Delete a specific Order object.
	 * @param {string} orderID
	 * @returns {Order} Deleted Order object.
	 */
	delete = async (orderID: string): Promise<Order | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			let sql: string = 'EMPTY SQL QUERY';

			// delete order products from order_products table:
			sql =
				'DELETE FROM order_products WHERE order_id=($1)::UUID RETURNING *';
			await client.query(sql, [orderID]);

			// THEN: delete order from orders table:
			sql = 'DELETE FROM orders WHERE id=($1)::UUID RETURNING *';
			const result = await client.query(sql, [orderID]);

			// release connection:
			client.release();

			// return deleted order:
			return result.rows[0];
		} catch (error) {
			console.error(
				`Order Model: Unable to delete ${orderID}: ${
					(error as Error).message
				}`
			);
		}
	};
}

export default OrderModel;
