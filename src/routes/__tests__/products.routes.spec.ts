import supertest from 'supertest';
import app from '../../server';

const req = supertest(app);

describe('Products Endpoints Suite', () => {
	it('GET (/products) route response', async () => {
		const res = await req.get('/products');
		expect(res.statusCode).toBe(200);
	});

	it('POST (/products/create) route response', async () => {
		const res = await req.post('/products/create');
		expect(res.statusCode).toBe(200);
	});

	it('GET (/products/show/:id) route response', async () => {
		const res = await req.get('/products/show/1');
		expect(res.statusCode).toBe(200);
	});

	it('GET (/products/showAll) route response', async () => {
		const res = await req.get('/products/showAll');
		expect(res.statusCode).toBe(200);
	});

	it('PUT (/products/update/:id) route response', async () => {
		const res = await req.put('/products/update/1');
		expect(res.statusCode).toBe(200);
	});

	it('DELETE (/products/delete/:id) route response', async () => {
		const res = await req.delete('/products/delete/1');
		expect(res.statusCode).toBe(200);
	});
});
