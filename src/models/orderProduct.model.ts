import { PoolClient } from 'pg';
import pool from '../database';
import Order from '../types/order.type';
import OrderProduct from '../types/orderProduct.type';

class OrderProductsModel {
	/**
	 * @description Check specific order's status.
	 * @param {string} orderID
	 * @returns {boolean} Order's status.
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
				`OrderProduct Model: Unable to check order status ${orderID}: ${
					(error as Error).message
				}`
			);
		}
	};

	/**
	 * @description Add new product into order_products table.
	 * @param {string} orderID
	 * @param {OrderProduct} orderProduct
	 * @returns {OrderProduct} Added OrderProduct object.
	 */
	addProduct = async (
		orderID: string,
		orderProduct: OrderProduct
	): Promise<Order | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			const sql =
				'UPDATE orders SET products_ids=ARRAY_APPEND(products_ids, ($2)::UUID), products_quantities=ARRAY_APPEND(products_quantities, ($3)::INTEGER) WHERE id=($1)::UUID RETURNING *';
			const sentValues = [
				orderID,
				orderProduct.product_id,
				orderProduct.quantity,
			];

			// check order's status to be (false)--->(active):
			if (await this.checkOrderStatus(orderProduct.order_id)) {
				console.log(
					`OrderProduct Model: Unable to add product into ${
						orderProduct.order_id
					}: Order status is ${await this.checkOrderStatus(
						orderProduct.order_id
					)}`
				);
				return;
			}

			// run desired query:
			const result = await client.query(sql, sentValues);

			// release connection:
			client.release();

			// return a specific orderProduct:
			return result.rows[0];
		} catch (error) {
			console.error(
				`OrderProduct Model: Unable to add product ${
					orderProduct.product_id
				} into ${orderID}: ${(error as Error).message}`
			);
		}
	};

	// /**
	//  * @description Show a specific OrderProduct from the database.
	//  * @param {string} orderID
	//  * @param {string} productID
	//  * @returns {OrderProduct} Desired OrderProduct object.
	//  */
	// showProduct = async (
	// 	orderID: string,
	// 	productID: string
	// ): Promise<OrderProduct | void> => {
	// 	try {
	// 		// connect to database:
	// 		const client: PoolClient = await pool.connect();

	// 		const sql =
	// 			'SELECT * FROM order_products WHERE order_id=($1) AND product_id=($2)';

	// 		// run desired query:
	// 		const result = await client.query(sql, [orderID, productID]);

	// 		// release connection:
	// 		client.release();

	// 		// return a specific orderProduct:
	// 		return result.rows[0];
	// 	} catch (error) {
	// 		console.error(
	// 			`OrderProduct Model: Unable to show product ${productID} within ${orderID}: ${
	// 				(error as Error).message
	// 			}`
	// 		);
	// 	}
	// };

	// /**
	//  * @description Show all OrderProduct objects from the database.
	//  * @param {string} orderID
	//  * @returns {Array<OrderProduct>} Array of OrderProduct objects.
	//  */
	// showAllProducts = async (
	// 	orderID: string
	// ): Promise<Array<OrderProduct> | void> => {
	// 	try {
	// 		// connect to database:
	// 		const client: PoolClient = await pool.connect();

	// 		const sql = 'SELECT * FROM order_products WHERE order_id=($1)';

	// 		// run desired query:
	// 		const result = await client.query(sql, [orderID]);

	// 		// release connection:
	// 		client.release();

	// 		// return a specific orderProduct:
	// 		return result.rows;
	// 	} catch (error) {
	// 		console.error(
	// 			`OrderProduct Model: Unable to show products within ${orderID}: ${
	// 				(error as Error).message
	// 			}`
	// 		);
	// 	}
	// };

	// /**
	//  * @description Update a specific OrderProduct object.
	//  * @param {string} orderID
	//  * @param {string} productID
	//  * @param {number} quantity
	//  * @returns {OrderProduct} Updated OrderProduct object.
	//  */
	// updateProductQuantity = async (
	// 	orderID: string,
	// 	productID: string,
	// 	quantity: number
	// ): Promise<OrderProduct | void> => {
	// 	try {
	// 		// connect to database:
	// 		const client: PoolClient = await pool.connect();

	// 		const sql =
	// 			'UPDATE order_products SET quantity=($3) WHERE order_id=($1) AND product_id=($2) RETURNING *';

	// 		// check order's status to be (false)--->(active):
	// 		if (await this.checkOrderStatus(orderID)) {
	// 			console.log(
	// 				`OrderProduct Model: Unable to add product into ${orderID}: Order status is ${await this.checkOrderStatus(
	// 					orderID
	// 				)}`
	// 			);
	// 			return;
	// 		}
	// 		// run desired query:
	// 		const result = await client.query(sql, [
	// 			orderID,
	// 			productID,
	// 			quantity,
	// 		]);

	// 		// release connection:
	// 		client.release();

	// 		// return a specific orderProduct:
	// 		return result.rows[0];
	// 	} catch (error) {
	// 		console.error(
	// 			`OrderProduct Model: Unable to update product ${productID} within ${orderID}: ${
	// 				(error as Error).message
	// 			}`
	// 		);
	// 	}
	// };

	// /**
	//  * @description Delete a specific OrderProduct object.
	//  * @param {string} orderID
	//  * @param {string} productID
	//  * @returns {OrderProduct} Deleted OrderProduct object.
	//  */
	// deleteProduct = async (
	// 	orderID: string,
	// 	productID: string
	// ): Promise<OrderProduct | void> => {
	// 	try {
	// 		// connect to database:
	// 		const client: PoolClient = await pool.connect();

	// 		const sql =
	// 			'DELETE FROM order_products WHERE order_id=($1) AND product_id=($2) RETURNING *';
	// 		// check order's status to be (false)--->(active):
	// 		if (await this.checkOrderStatus(orderID)) {
	// 			console.log(
	// 				`OrderProduct Model: Unable to add product into ${orderID}: Order status is ${await this.checkOrderStatus(
	// 					orderID
	// 				)}`
	// 			);
	// 			return;
	// 		}

	// 		// run desired query:
	// 		const result = await client.query(sql, [orderID, productID]);

	// 		// release connection:
	// 		client.release();

	// 		// return a specific orderProduct:
	// 		return result.rows[0];
	// 	} catch (error) {
	// 		console.error(
	// 			`OrderProduct Model: Unable to delete product ${productID} from ${orderID}: ${
	// 				(error as Error).message
	// 			}`
	// 		);
	// 	}
	// };
}

export default OrderProductsModel;
