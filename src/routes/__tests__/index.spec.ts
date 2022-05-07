import supertest from 'supertest';
import app from '../../server';
import { ordersEndpointsSpecs } from './orders.routes.spec';
import { productsEndpointsSpecs } from './products.routes.spec';
import { usersEndpointsSpecs } from './users.routes.spec';

const req = supertest(app);

describe('Server Endpoints Suites', () => {
	describe('Main Endpoint Suite', () => {
		it('GET (/) route response', async () => {
			const res = await req.get('/');
			expect(res.statusCode).toBe(200);
		});
	});

	// orders endpoints suite:
	ordersEndpointsSpecs();

	// products endpoints suite:
	productsEndpointsSpecs();

	// users endpoints suite:
	usersEndpointsSpecs();
});
