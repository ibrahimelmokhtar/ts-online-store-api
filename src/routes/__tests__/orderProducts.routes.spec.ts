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
		it('GET (/orders/:orderID) route response', async () => {
			// this is required to generate token:
			const resUser = await req.post('/users/signin').send(DEFAULT_USER);
			// set token value:
			token += resUser.body.data.token;

			const res = await req.get(`/orders/${NIL_UUID}`);
			expect(res.statusCode).toBe(200);
		});

		it('POST (/orders/:orderID/products/add) route response', async () => {
			// THIS WILL REMAIN IN DB TABLE FOR FURTHER INTEGRATION TESTING:
			await req
				.post(`/orders/${NIL_UUID}/products/add`)
				.set('Authorization', token)
				.send(DEFAULT_ORDER_PRODUCT);

			const res = await req
				.post(`/orders/${NIL_UUID}/products/add`)
				.set('Authorization', token)
				.send(OTHER_ORDER_PRODUCT);
			expect(res.statusCode).toBe(200);
		});

		it('GET (/orders/:orderID/products/show/:productID) route response', async () => {
			const res = await req
				.get(`/orders/${NIL_UUID}/products/show/${NIL_UUID}`)
				.set('Authorization', token);
			expect(res.statusCode).toBe(200);
		});

		it('GET (/orders/:orderID/products/showAll) route response', async () => {
			const res = await req
				.get(`/orders/${NIL_UUID}/products/showAll`)
				.set('Authorization', token);
			expect(res.statusCode).toBe(200);
		});
	});
};
