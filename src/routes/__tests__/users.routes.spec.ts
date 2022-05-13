import supertest from 'supertest';
import app from '../../server';
import { NIL as NIL_UUID } from 'uuid';
import { DEFAULT_USER, OTHER_USER } from '../../constants/user.type.constant';
import { UNIQUE_UUID } from '../../constants/unique.uuid.constant';

const req = supertest(app);

export const usersEndpointsSpecs = () => {
	describe('├─── Users Endpoints Suite', () => {
		it('POST (/users/signup) --> 201 Created - [Create New User]', async () => {
			// THIS WILL REMAIN IN DB TABLE FOR FURTHER INTEGRATION TESTING:
			await req.post('/users/signup').send(DEFAULT_USER);

			const res = await req.post('/users/signup').send(OTHER_USER);

			// 201 Created
			expect(res.statusCode).toBe(201);
		});

		// user token:
		let token: string = 'Bearer ';

		it('POST (/users/signin) --> 202 Accepted - [Authenticate Specific User]', async () => {
			const res = await req.post('/users/signin').send(DEFAULT_USER);

			// set token value:
			token += res.body.data.token;

			// 202 Accepted
			expect(res.statusCode).toBe(202);
		});

		it('GET (/users/:userID) --> 200 Ok - [Show Specific User]', async () => {
			const res = await req
				.get(`/users/${NIL_UUID}`)
				.set('Authorization', token);

			// 200 Ok
			expect(res.statusCode).toBe(200);
		});

		it('GET (/users) --> 200 Ok - [Show All Users]', async () => {
			const res = await req.get('/users').set('Authorization', token);

			// 200 Ok
			expect(res.statusCode).toBe(200);
		});

		it('PUT (/users/:userID) --> 200 Ok - [Update Specific User]', async () => {
			const res = await req
				.put(`/users/${UNIQUE_UUID}`)
				.set('Authorization', token)
				.send(OTHER_USER);

			// 200 Ok
			expect(res.statusCode).toBe(200);
		});

		it('DELETE (/users/:userID) --> 200 Ok - [Delete Specific User]', async () => {
			const res = await req
				.delete(`/users/${UNIQUE_UUID}`)
				.set('Authorization', token);

			// 200 Ok
			expect(res.statusCode).toBe(200);
		});
	});
};
