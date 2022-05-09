import { userModelSpecs } from './user.model.spec';
import { productModelSpecs } from './product.model.spec';
import { orderModelSpecs } from './order.model.spec';
import { orderProductModelSpecs } from './orderProducts.model.spec';
import { PoolClient } from 'pg';
import pool from '../../database';
import { NIL as NIL_UUID } from 'uuid';

describe('├─── Models Suites', () => {
	// user model suite:
	userModelSpecs();

	// product model suite:
	productModelSpecs();

	// order model suite:
	orderModelSpecs();

	// cart model suite:
	orderProductModelSpecs();

	// DELETE DEFAULT ENTRIES FROM CREATED TABLES:
	// THEY MUST BE DELETED IN THAT SEQUENCE.
	afterAll(async () => {
		const client: PoolClient = await pool.connect();
		await client.query('DELETE FROM order_products WHERE id=($1)', [
			NIL_UUID,
		]);
		await client.query('DELETE FROM orders WHERE id=($1)', [NIL_UUID]);
		await client.query('DELETE FROM products WHERE id=($1)', [NIL_UUID]);
		await client.query('DELETE FROM users WHERE id=($1)', [NIL_UUID]);
		client.release();
	});
});
