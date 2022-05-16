import {
	DEFAULT_ORDER,
	DONE_ORDER,
	OTHER_ORDER,
} from '../../constants/order.type.constant';
import supertest from 'supertest';
import app from '../../server';
import { DEFAULT_USER } from '../../constants/user.type.constant';

const req = supertest(app);

export const ordersEndpointsSpecs = () => {
	describe('├─── Orders Endpoints Suite', () => {
		let token: string = 'Bearer ';
		beforeAll(async () => {
			// this is required to generate token:
			const resUser = await req.post('/users/login').send(DEFAULT_USER);
			// set token value:
			token += resUser.body.user.token;
		});

		it('POST (/orders/create) --> 201 Created - [Create New Order]', async () => {
			// THIS WILL REMAIN IN DB TABLE FOR FURTHER INTEGRATION TESTING:
			await req
				.post('/orders/create')
				.set('Authorization', token)
				.send(DEFAULT_ORDER);

			const res = await req
				.post('/orders/create')
				.set('Authorization', token)
				.send(OTHER_ORDER);

			// 201 Created
			expect(res.statusCode).toBe(201);
		});

		it('GET (/orders/:orderID) --> 200 Ok - [Show Specific Order]', async () => {
			const res = await req
				.get(`/orders/${DEFAULT_ORDER.id}`)
				.set('Authorization', token);

			// 200 Ok
			expect(res.statusCode).toBe(200);
		});

		it('GET (/orders) --> 200 Ok - [Show All Orders]', async () => {
			const res = await req.get('/orders').set('Authorization', token);

			// 200 Ok
			expect(res.statusCode).toBe(200);
		});

		it('UPDATE (/orders/:orderID) --> 200 Ok - [Update Specific Order]', async () => {
			const res = await req
				.put(`/orders/${OTHER_ORDER.id}`)
				.set('Authorization', token)
				.send(DONE_ORDER);

			// 200 Ok
			expect(res.statusCode).toBe(200);
		});

		it('DELETE (/orders/:orderID) --> 200 Ok - [Delete Specific Order]', async () => {
			const res = await req
				.delete(`/orders/${OTHER_ORDER.id}`)
				.set('Authorization', token);

			// 200 Ok
			expect(res.statusCode).toBe(200);
		});
	});
};
