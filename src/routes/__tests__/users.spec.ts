import supertest from 'supertest';
import app from '../../server';

const req = supertest(app);

describe('Users Endpoints Suite', () => {
	it('GET (/users) route response', async () => {
		const res = await req.get('/users');
		expect(res.statusCode).toBe(200);
	});

	it('POST (/users/create) route response', async () => {
		const res = await req.post('/users/create');
		expect(res.statusCode).toBe(200);
	});

	it('GET (/users/show/:id) route response', async () => {
		const res = await req.get('/users/show/1');
		expect(res.statusCode).toBe(200);
	});

	it('GET (/users/showAll) route response', async () => {
		const res = await req.get('/users/showAll');
		expect(res.statusCode).toBe(200);
	});

	it('PUT (/users/update/:id) route response', async () => {
		const res = await req.put('/users/update/1');
		expect(res.statusCode).toBe(200);
	});

	it('DELETE (/users/delete/:id) route response', async () => {
		const res = await req.delete('/users/delete/1');
		expect(res.statusCode).toBe(200);
	});
});
