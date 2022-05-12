import supertest from 'supertest';
import app from '../../server';
import { NIL as NIL_UUID } from 'uuid';
import { DEFAULT_USER, OTHER_USER } from '../../constants/user.type.constant';
import { UNIQUE_UUID } from '../../constants/unique.uuid.constant';

const req = supertest(app);

export const usersEndpointsSpecs = () => {
	describe('├─── Users Endpoints Suite', () => {
		it('GET (/users) - 404 Not Found', async () => {
			const res = await req.get('/users');

			// 404 Not Found
			expect(res.statusCode).toBe(404);
		});

		it('POST (/users/create) - 201 Created', async () => {
			// THIS WILL REMAIN IN DB TABLE FOR FURTHER INTEGRATION TESTING:
			await req.post('/users/create').send(DEFAULT_USER);

			const res = await req.post('/users/create').send(OTHER_USER);

			// 201 Created
			expect(res.statusCode).toBe(201);
		});

		// user token:
		let token: string = 'Bearer ';

		it('POST (/users/signin) - 202 Accepted', async () => {
			const res = await req.post('/users/signin').send(DEFAULT_USER);

			// set token value:
			token += res.body.data.token;

			// 202 Accepted
			expect(res.statusCode).toBe(202);
		});

		it('GET (/users/show/:userID) - 200 Ok', async () => {
			const res = await req
				.get(`/users/show/${NIL_UUID}`)
				.set('Authorization', token);

			// 200 Ok
			expect(res.statusCode).toBe(200);
		});

		it('GET (/users/showAll) - 200 Ok', async () => {
			const res = await req
				.get('/users/showAll')
				.set('Authorization', token);

			// 200 Ok
			expect(res.statusCode).toBe(200);
		});

		it('PUT (/users/update/:userID) - 200 Ok', async () => {
			const res = await req
				.put(`/users/update/${UNIQUE_UUID}`)
				.set('Authorization', token)
				.send(OTHER_USER);

			// 200 Ok
			expect(res.statusCode).toBe(200);
		});

		it('DELETE (/users/delete/:userID) - 200 Ok', async () => {
			const res = await req
				.delete(`/users/delete/${UNIQUE_UUID}`)
				.set('Authorization', token);

			// 200 Ok
			expect(res.statusCode).toBe(200);
		});
	});
};
