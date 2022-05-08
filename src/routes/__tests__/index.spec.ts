import supertest from 'supertest';
import app from '../../server';
import { ordersEndpointsSpecs } from './orders.routes.spec';
import { productsEndpointsSpecs } from './products.routes.spec';
import { usersEndpointsSpecs } from './users.routes.spec';

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
});
