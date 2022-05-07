import supertest from 'supertest';
import app from '../../server';

const req = supertest(app);

export const ordersEndpointsSpecs = () => {
	describe('Orders Endpoints Suite', () => {
		it('GET (/orders) route response', async () => {
			const res = await req.get('/orders');
			expect(res.statusCode).toBe(200);
		});
	});
};
