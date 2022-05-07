import Product from '../types/product.type';
import pool from '../database';
import { PoolClient } from 'pg';

class ProductModel {
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
					'INSERT INTO products (id, name, price, category) VALUES ($1, $2, $3, $4) RETURNING *';
				sentValues = [
					product.id as string,
					product.name,
					product.price,
					product.category,
				];
			} else {
				sql =
					'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *';
				sentValues = [product.name, product.price, product.category];
			}
			const result = await client.query(sql, sentValues);

			// release connection:
			client.release();

			// return created product:
			return result.rows[0];
		} catch (error) {
			if (process.env.NODE_ENV !== 'test') {
				console.error(
					`Product Model: Unable to create ${product.name}: ${
						(error as Error).message
					}`
				);
			}
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
			const sql: string = 'SELECT * FROM products WHERE id=($1)';
			const result = await client.query(sql, [productID]);

			// release connection:
			client.release();

			// return a specific product:
			return result.rows[0];
		} catch (error) {
			if (process.env.NODE_ENV !== 'test') {
				console.error(
					`Product Model: Unable to show ${productID}: ${
						(error as Error).message
					}`
				);
			}
		}
	};

	/**
	 * @description Show all Product objects from the database.
	 * @returns {Product[]} Array of Product objects.
	 */
	showAllProducts = async (): Promise<Product[] | void> => {
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
			if (process.env.NODE_ENV !== 'test') {
				console.error(
					`Product Model: Unable to show products: ${
						(error as Error).message
					}`
				);
			}
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
				'UPDATE products SET name=($2), price=($3), category=($4) WHERE id=($1) RETURNING *';
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
			if (process.env.NODE_ENV !== 'test') {
				console.error(
					`Product Model: Unable to update ${productID}: ${
						(error as Error).message
					}`
				);
			}
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
				'DELETE FROM products WHERE id=($1) RETURNING *';
			const result = await client.query(sql, [productID]);

			// release connection:
			client.release();

			// return deleted product:
			return result.rows[0];
		} catch (error) {
			if (process.env.NODE_ENV !== 'test') {
				console.error(
					`Product Model: Unable to delete ${productID}: ${
						(error as Error).message
					}`
				);
			}
		}
	};
}

export default ProductModel;
