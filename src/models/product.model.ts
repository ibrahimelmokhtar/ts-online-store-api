import Product from '../types/product.type';
import pool from '../database';
import { PoolClient } from 'pg';

class ProductModel {
	/**
	 * @description Check product existence within the database via specific info (name or id).
	 * @param {string} info
	 * @param {boolean} isName
	 * @returns {boolean} Product's existence status (true: is found, false: is NOT found).
	 */
	checkProductExistence = async (
		info: string,
		isName: boolean
	): Promise<boolean | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			let sql: string = 'EMPTY SQL QUERY';
			if (isName) {
				sql = 'SELECT * FROM products WHERE name=($1)::VARCHAR';
			} else {
				sql = 'SELECT * FROM products WHERE id=($1)::UUID';
			}
			const result = await client.query(sql, [info]);

			// release connection:
			client.release();

			let isFound = false;
			if (result.rows[0]) {
				isFound = true;
			}

			// return product status:
			return isFound;
		} catch (error) {
			console.error(
				`Product Model: Unable to check ${info}: ${
					(error as Error).message
				}`
			);
		}
	};

	/**
	 * @description Create new Product within the database.
	 * @param {Product} product
	 * @returns {Product} Created Product object.
	 */
	create = async (product: Product): Promise<Product | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			let sql: string = 'EMPTY SQL QUERY';
			let sentValues: Array<string | number> = [];
			if (process.env.NODE_ENV === 'test') {
				sql =
					'INSERT INTO products (id, name, price, category) VALUES ($1::UUID, $2::VARCHAR, $3::FLOAT, $4::VARCHAR) RETURNING *';
				sentValues = [
					product.id as string,
					product.name,
					product.price,
					product.category,
				];
			} else {
				sql =
					'INSERT INTO products (name, price, category) VALUES ($1::VARCHAR, $2::FLOAT, $3::VARCHAR) RETURNING *';
				sentValues = [product.name, product.price, product.category];
			}
			const result = await client.query(sql, sentValues);

			// release connection:
			client.release();

			// return created product:
			return result.rows[0];
		} catch (error) {
			console.error(
				`Product Model: Unable to create ${product.name}: ${
					(error as Error).message
				}`
			);
		}
	};

	/**
	 * @description Show a specific Product from the database.
	 * @param {string} productID
	 * @returns {Product} Desired Product object.
	 */
	show = async (productID: string): Promise<Product | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			const sql: string = 'SELECT * FROM products WHERE id=($1)::UUID';
			const result = await client.query(sql, [productID]);

			// release connection:
			client.release();

			// return a specific product:
			return result.rows[0];
		} catch (error) {
			console.error(
				`Product Model: Unable to show ${productID}: ${
					(error as Error).message
				}`
			);
		}
	};

	/**
	 * @description Show all Product objects from the database.
	 * @returns {Array<Product>} Array of Product objects.
	 */
	showAll = async (): Promise<Array<Product> | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			const sql: string = 'SELECT * FROM products';
			const result = await client.query(sql);

			// release connection:
			client.release();

			// return all products:
			return result.rows;
		} catch (error) {
			console.error(
				`Product Model: Unable to show products: ${
					(error as Error).message
				}`
			);
		}
	};

	/**
	 * @description Update a specific Product object.
	 * @param {string} productID
	 * @param {Product} product
	 * @returns {Product} Updated Product object.
	 */
	update = async (
		productID: string,
		product: Product
	): Promise<Product | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			const sql: string =
				'UPDATE products SET name=($2)::VARCHAR, price=($3)::FLOAT, category=($4)::VARCHAR WHERE id=($1)::UUID RETURNING *';
			const result = await client.query(sql, [
				productID,
				product.name,
				product.price,
				product.category,
			]);

			// release connection:
			client.release();

			// return updated product:
			return result.rows[0];
		} catch (error) {
			console.error(
				`Product Model: Unable to update ${productID}: ${
					(error as Error).message
				}`
			);
		}
	};

	/**
	 * @description Delete a specific Product object.
	 * @param {string} productID
	 * @returns {Product} Deleted Product object.
	 */
	delete = async (productID: string): Promise<Product | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			const sql: string =
				'DELETE FROM products WHERE id=($1)::UUID RETURNING *';
			const result = await client.query(sql, [productID]);

			// release connection:
			client.release();

			// return deleted product:
			return result.rows[0];
		} catch (error) {
			console.error(
				`Product Model: Unable to delete ${productID}: ${
					(error as Error).message
				}`
			);
		}
	};
}

export default ProductModel;
