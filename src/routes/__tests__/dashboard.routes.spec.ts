import supertest from 'supertest';
import { DEFAULT_USER } from '../../constants/user.type.constant';
import app from '../../server';

const req = supertest(app);

export const dashboardEndpointsSpecs = () => {
	describe('├─── Dashboard Endpoints Suite', () => {
		let token: string = 'Bearer ';
		beforeAll(async () => {
			// this is required to generate token:
			const resUser = await req.post('/users/login').send(DEFAULT_USER);
			// set token value:
			token += resUser.body.user.token;
		});

		it('GET (/dashboard/productsInOrders) --> 200 Ok - [Show All Products In All Orders]', async () => {
			const res = await req
				.get('/dashboard/productsInOrders')
				.set('Authorization', token);

			// 200 Ok
			expect(res.statusCode).toBe(200);
		});
	});
};
