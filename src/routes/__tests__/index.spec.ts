import { PoolClient } from 'pg';
import pool from '../../database';
import supertest from 'supertest';
import app from '../../server';
import { orderProductsEndpointsSpecs } from './orderProducts.routes.spec';
import { ordersEndpointsSpecs } from './orders.routes.spec';
import { productsEndpointsSpecs } from './products.routes.spec';
import { usersEndpointsSpecs } from './users.routes.spec';
import { dashboardEndpointsSpecs } from './dashboard.routes.spec';

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

	// dashboard endpoints suite:
	dashboardEndpointsSpecs();

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
