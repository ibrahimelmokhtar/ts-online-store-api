import supertest from 'supertest';
import app from '../../server';
import {
	DEFAULT_ORDER_PRODUCT,
	OTHER_ORDER_PRODUCT,
} from '../../constants/orderProduct.type.constant';
import { NIL as NIL_UUID } from 'uuid';
import { DEFAULT_USER } from '../../constants/user.type.constant';

const req = supertest(app);

export const orderProductsEndpointsSpecs = () => {
	describe('├─── OrderProducts Endpoints Suite', () => {
		let token: string = 'Bearer ';
		it('GET (/orders/:orderID) - 404 Not Found', async () => {
			// this is required to generate token:
			const resUser = await req.post('/users/signin').send(DEFAULT_USER);
			// set token value:
			token += resUser.body.data.token;

			const res = await req.get(`/orders/${NIL_UUID}`);

			// 404 Not Found
			expect(res.statusCode).toBe(404);
		});

		it('POST (/orders/:orderID/products/add) - 200 Ok', async () => {
			// THIS WILL REMAIN IN DB TABLE FOR FURTHER INTEGRATION TESTING:
			await req
				.post(`/orders/${NIL_UUID}/products/add`)
				.set('Authorization', token)
				.send(DEFAULT_ORDER_PRODUCT);

			const res = await req
				.post(`/orders/${NIL_UUID}/products/add`)
				.set('Authorization', token)
				.send(OTHER_ORDER_PRODUCT);

			// 200 Ok
			expect(res.statusCode).toBe(200);
		});

		it('GET (/orders/:orderID/products/show/:productID) - 200 Ok', async () => {
			const res = await req
				.get(`/orders/${NIL_UUID}/products/show/${NIL_UUID}`)
				.set('Authorization', token);

			// 200 Ok
			expect(res.statusCode).toBe(200);
		});

		it('GET (/orders/:orderID/products/showAll) - 200 Ok', async () => {
			const res = await req
				.get(`/orders/${NIL_UUID}/products/showAll`)
				.set('Authorization', token);

			// 200 Ok
			expect(res.statusCode).toBe(200);
		});
	});
};
