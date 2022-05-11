import supertest from 'supertest';
import { DEFAULT_USER } from '../../constants/user.type.constant';
import app from '../../server';

const req = supertest(app);

export const dashboardEndpointsSpecs = () => {
	describe('├─── Dashboard Endpoints Suite', () => {
		let token: string = 'Bearer ';
		it('GET (/dashboard) route response', async () => {
			// this is required to generate token:
			const resUser = await req.post('/users/signin').send(DEFAULT_USER);
			// set token value:
			token += resUser.body.data.token;

			const res = await req.get('/dashboard');
			expect(res.statusCode).toBe(200);
		});

		it('GET (/dashboard/productsInOrders) route response', async () => {
			const res = await req
				.get('/dashboard/productsInOrders')
				.set('Authorization', token);
			expect(res.statusCode).toBe(200);
		});
	});
};
