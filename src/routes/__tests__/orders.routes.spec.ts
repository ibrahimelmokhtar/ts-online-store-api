import supertest from 'supertest';
import app from '../../server';
import { NIL as NIL_UUID } from 'uuid';

const req = supertest(app);

export const ordersEndpointsSpecs = () => {
	describe('├─── Orders Endpoints Suite', () => {
		it('GET (/orders) route response', async () => {
			const res = await req.get('/orders');
			expect(res.statusCode).toBe(200);
		});

		it('POST (/orders/create) route response', async () => {
			const res = await req.post('/products/create');
			expect(res.statusCode).toBe(200);
		});

		it('GET (/orders/show/:id) route response', async () => {
			const res = await req.get(`/products/show/${NIL_UUID}`);
			expect(res.statusCode).toBe(200);
		});

		it('GET (/orders/showAll) route response', async () => {
			const res = await req.get('/products/showAll');
			expect(res.statusCode).toBe(200);
		});

		it('UPDATE (/orders/update/:id) route response', async () => {
			const res = await req.put(`/products/update/${NIL_UUID}`);
			expect(res.statusCode).toBe(200);
		});

		it('DELETE (/orders/delete/:id) route response', async () => {
			const res = await req.delete(`/products/delete/${NIL_UUID}`);
			expect(res.statusCode).toBe(200);
		});
	});
};
