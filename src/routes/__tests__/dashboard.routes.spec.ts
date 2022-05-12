import supertest from 'supertest';
import { DEFAULT_USER } from '../../constants/user.type.constant';
import app from '../../server';

const req = supertest(app);

export const dashboardEndpointsSpecs = () => {
	describe('├─── Dashboard Endpoints Suite', () => {
		let token: string = 'Bearer ';
		it('GET (/dashboard) - 404 Not Found', async () => {
			// this is required to generate token:
			const resUser = await req.post('/users/signin').send(DEFAULT_USER);
			// set token value:
			token += resUser.body.data.token;

			const res = await req.get('/dashboard');

			// 404 Not Found
			expect(res.statusCode).toBe(404);
		});

		it('GET (/dashboard/productsInOrders) - 200 Ok', async () => {
			const res = await req
				.get('/dashboard/productsInOrders')
				.set('Authorization', token);

			// 200 Ok
			expect(res.statusCode).toBe(200);
		});
	});
};
