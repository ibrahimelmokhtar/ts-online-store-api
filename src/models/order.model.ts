import pool from '../database';
import { PoolClient } from 'pg';
import Order from '../types/order.type';

class OrderModel {
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
			let sentValues: Array<string | boolean> = [];
			if (process.env.NODE_ENV === 'test') {
				sql =
					'INSERT INTO orders (id, is_done, user_id) VALUES ($1, $2, $3) RETURNING *';
				sentValues = [
					order.id as string,
					order.isDone,
					order.userID as string,
				];
			} else {
				sql =
					'INSERT INTO orders (is_done, user_id) VALUES ($1, $2) RETURNING *';
				sentValues = [order.isDone, order.userID as string];
			}

			// run desired query:
			const result = await client.query(sql, sentValues);

			// release connection:
			client.release();

			// return a specific order:
			return result.rows[0];
		} catch (error) {
			console.error(
				`Order Model: Unable to create order for user ${
					order.userID
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
			const sql: string = 'SELECT * FROM orders WHERE id=($1)';
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
	 * @param {Order} order
	 * @returns {Order} Updated Order object.
	 */
	update = async (orderID: string, order: Order): Promise<Order | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			const sql: string =
				'UPDATE orders SET is_done=($2), user_id=($3) WHERE id=($1) RETURNING *';
			const result = await client.query(sql, [
				orderID,
				order.isDone,
				order.userID,
			]);

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

			// run desired query:
			const sql: string = 'DELETE FROM orders WHERE id=($1) RETURNING *';
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
