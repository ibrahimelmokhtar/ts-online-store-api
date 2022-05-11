import supertest from 'supertest';
import { DEFAULT_USER } from '../../constants/user.type.constant';
import app from '../../server';

const req = supertest(app);

export const dashboardEndpointsSpecs = () => {
	describe('├─── Dashboard Endpoints Suite', () => {
		it('GET (/dashboard) route response', async () => {
			const res = await req.get('/dashboard');
			expect(res.statusCode).toBe(200);
		});

		it('GET (/dashboard/productsInOrders) route response', async () => {
			const res = await req.get('/dashboard/productsInOrders');
			expect(res.statusCode).toBe(200);
		});

		it('GET (/dashboard/:userID/showOrders) route response', async () => {
			const res = await req.get(
				`/dashboard/${DEFAULT_USER.id}/showOrders`
			);

			expect(res.statusCode).toBe(200);
		});
	});
};
