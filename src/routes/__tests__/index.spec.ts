import supertest from 'supertest';
import app from '../../server';

const req = supertest(app);

describe('Server Endpoints Suite', () => {
	it('GET (/) route response', async () => {
		const res = await req.get('/');
		expect(res.statusCode).toBe(200);
	});
});
