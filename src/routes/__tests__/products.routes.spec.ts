import supertest from 'supertest';
import app from '../../server';

const req = supertest(app);

export const productsEndpointsSpecs = () => {
	describe('Products Endpoints Suite', () => {
		it('GET (/products) route response', async () => {
			const res = await req.get('/products');
			expect(res.statusCode).toBe(200);
		});
	});
};
