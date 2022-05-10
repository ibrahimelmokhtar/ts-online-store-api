import { userModelSpecs } from './user.model.spec';
import { productModelSpecs } from './product.model.spec';
import { orderModelSpecs } from './order.model.spec';
import { orderProductModelSpecs } from './orderProducts.model.spec';
import { PoolClient } from 'pg';
import pool from '../../database';

describe('├─── Models Suites', () => {
	// user model suite:
	userModelSpecs();

	// product model suite:
	productModelSpecs();

	// order model suite:
	orderModelSpecs();

	// orderProduct model suite:
	orderProductModelSpecs();

	// DELETE DEFAULT ENTRIES FROM CREATED TABLES:
	// THEY MUST BE DELETED IN THAT SEQUENCE.
	afterAll(async () => {
		const client: PoolClient = await pool.connect();
		await client.query('DELETE FROM order_products');
		await client.query('DELETE FROM orders');
		await client.query('DELETE FROM products');
		await client.query('DELETE FROM users');
		client.release();
	});
});
