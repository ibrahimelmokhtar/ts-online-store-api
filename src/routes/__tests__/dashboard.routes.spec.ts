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

		it('GET (/dashboard/recentOrders/:userID) --> 200 Ok - [Show Recent Orders Per User]', async () => {
			const res = await req
				.get(`/dashboard/recentOrders/${DEFAULT_USER.id}`)
				.set('Authorization', token);

			// 200 Ok
			expect(res.statusCode).toBe(200);
		});

		it('GET (/dashboard/topProducts) --> 200 Ok - [Show Top Ordered Products]', async () => {
			const res = await req
				.get('/dashboard/topProducts')
				.set('Authorization', token);

			// 200 Ok
			expect(res.statusCode).toBe(200);
		});
	});
};
