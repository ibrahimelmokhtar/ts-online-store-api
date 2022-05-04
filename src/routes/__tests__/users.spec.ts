import supertest from 'supertest';
import app from '../../server';

const req = supertest(app);

describe('Users Endpoints Suite', () => {
	it('GET (/users) route response', async () => {
		const res = await req.get('/users');
		expect(res.statusCode).toBe(200);
	});
});
