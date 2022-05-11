import {
	DEFAULT_ORDER,
	DONE_ORDER,
	OTHER_ORDER,
} from '../../constants/order.type.constant';
import supertest from 'supertest';
import app from '../../server';
import { NIL as NIL_UUID } from 'uuid';
import { UNIQUE_UUID } from '../../constants/unique.uuid.constant';
import { DEFAULT_USER } from '../../constants/user.type.constant';

const req = supertest(app);

export const ordersEndpointsSpecs = () => {
	describe('├─── Orders Endpoints Suite', () => {
		let token: string = 'Bearer ';
		it('GET (/orders) route response', async () => {
			// this is required to generate token:
			const resUser = await req.post('/users/signin').send(DEFAULT_USER);
			// set token value:
			token += resUser.body.data.token;

			const res = await req.get('/orders');
			expect(res.statusCode).toBe(200);
		});

		it('POST (/orders/create) route response', async () => {
			// THIS WILL REMAIN IN DB TABLE FOR FURTHER INTEGRATION TESTING:
			await req
				.post('/orders/create')
				.set('Authorization', token)
				.send(DEFAULT_ORDER);

			const res = await req
				.post('/orders/create')
				.set('Authorization', token)
				.send(OTHER_ORDER);
			expect(res.statusCode).toBe(200);
		});

		it('GET (/orders/show/:orderID) route response', async () => {
			const res = await req
				.get(`/orders/show/${NIL_UUID}`)
				.set('Authorization', token);
			expect(res.statusCode).toBe(200);
		});

		it('GET (/orders/showAll) route response', async () => {
			const res = await req
				.get('/orders/showAll')
				.set('Authorization', token);
			expect(res.statusCode).toBe(200);
		});

		it('UPDATE (/orders/updateStatus/:orderID) route response', async () => {
			const res = await req
				.put(`/orders/updateStatus/${UNIQUE_UUID}`)
				.set('Authorization', token)
				.send(DONE_ORDER);
			expect(res.statusCode).toBe(200);
		});

		it('DELETE (/orders/delete/:orderID) route response', async () => {
			const res = await req
				.delete(`/orders/delete/${UNIQUE_UUID}`)
				.set('Authorization', token);
			expect(res.statusCode).toBe(200);
		});
	});
};
