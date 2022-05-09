import { UNIQUE_UUID } from '../../constants/unique.uuid.constant';
import supertest from 'supertest';
import app from '../../server';
import {
	DEFAULT_ORDER_PRODUCT,
	OTHER_ORDER_PRODUCT,
} from '../../constants/orderProduct.type.constant';
import { NIL as NIL_UUID } from 'uuid';

const req = supertest(app);

export const orderProductsEndpointsSpecs = () => {
	describe('├─── OrderProducts Endpoints Suite', () => {
		it('GET (/orders/:orderID) route response', async () => {
			const res = await req.get(`/orders/${NIL_UUID}`);
			expect(res.statusCode).toBe(200);
		});

		it('POST (/orders/:orderID/products/add) route response', async () => {
			// THIS WILL REMAIN IN DB TABLE FOR FURTHER INTEGRATION TESTING:
			await req
				.post(`/orders/${NIL_UUID}/products/add`)
				.send(DEFAULT_ORDER_PRODUCT);

			const res = await req
				.post(`/orders/${NIL_UUID}/products/add`)
				.send(OTHER_ORDER_PRODUCT);
			expect(res.statusCode).toBe(200);
		});

		it('GET (/orders/:orderID/products/show/:productID) route response', async () => {
			const res = await req.get(
				`/orders/${NIL_UUID}/products/show/${NIL_UUID}`
			);
			expect(res.statusCode).toBe(200);
		});

		it('GET (/orders/:orderID/products/showAll) route response', async () => {
			const res = await req.get(`/orders/${NIL_UUID}/products/showAll`);
			expect(res.statusCode).toBe(200);
		});

		it('UPDATE (/orders/:orderID/products/update/:productID) route response', async () => {
			const res = await req
				.put(`/orders/${NIL_UUID}/products/update/${NIL_UUID}`)
				.send(DEFAULT_ORDER_PRODUCT);
			expect(res.statusCode).toBe(200);
		});

		it('DELETE (/orders/:orderID/products/delete/:productID) route response', async () => {
			const res = await req.delete(
				`/orders/${NIL_UUID}/products/delete/${UNIQUE_UUID}`
			);
			expect(res.statusCode).toBe(200);
		});
	});
};
