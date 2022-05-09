import { PoolClient } from 'pg';
import supertest from 'supertest';
import pool from '../../database';
import app from '../../server';
import { orderProductsEndpointsSpecs } from './orderProducts.routes.spec';
import { ordersEndpointsSpecs } from './orders.routes.spec';
import { productsEndpointsSpecs } from './products.routes.spec';
import { usersEndpointsSpecs } from './users.routes.spec';
import { NIL as NIL_UUID } from 'uuid';

const req = supertest(app);

describe('├─── Server Endpoints Suites', () => {
	// main endpoint suite:
	describe('├─── Main Endpoint Suite', () => {
		it('GET (/) route response', async () => {
			const res = await req.get('/');
			expect(res.statusCode).toBe(200);
		});
	});

	// users endpoints suite:
	usersEndpointsSpecs();

	// products endpoints suite:
	productsEndpointsSpecs();

	// orders endpoints suite:
	ordersEndpointsSpecs();

	// orderProducts endpoints suite:
	orderProductsEndpointsSpecs();

	// // DELETE DEFAULT ENTRIES FROM CREATED TABLES:
	// // THEY MUST BE DELETED IN THAT SEQUENCE.
	// afterAll(async () => {
	// 	const client: PoolClient = await pool.connect();
	// 	await client.query('DELETE FROM order_products WHERE id=($1)', [
	// 		NIL_UUID,
	// 	]);
	// 	await client.query('DELETE FROM orders WHERE id=($1)', [NIL_UUID]);
	// 	await client.query('DELETE FROM products WHERE id=($1)', [NIL_UUID]);
	// 	await client.query('DELETE FROM users WHERE id=($1)', [NIL_UUID]);
	// 	client.release();
	// });
});
