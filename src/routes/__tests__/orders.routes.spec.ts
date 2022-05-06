import supertest from 'supertest';
import app from '../../server';

const req = supertest(app);

describe('Orders Endpoints Suite', () => {
	it('GET (/orders) route response', async () => {
		const res = await req.get('/orders');
		expect(res.statusCode).toBe(200);
	});

	// it('POST (/orders/create) route response', async () => {
	// 	const res = await req.post('/orders/create');
	// 	expect(res.statusCode).toBe(200);
	// });

	// it('GET (/orders/show/:id) route response', async () => {
	// 	const res = await req.get('/orders/show/1');
	// 	expect(res.statusCode).toBe(200);
	// });

	// it('GET (/orders/showAll) route response', async () => {
	// 	const res = await req.get('/orders/showAll');
	// 	expect(res.statusCode).toBe(200);
	// });

	// it('PUT (/orders/update/:id) route response', async () => {
	// 	const res = await req.put('/orders/update/1');
	// 	expect(res.statusCode).toBe(200);
	// });

	// it('DELETE (/orders/delete/:id) route response', async () => {
	// 	const res = await req.delete('/orders/delete/1');
	// 	expect(res.statusCode).toBe(200);
	// });
});
