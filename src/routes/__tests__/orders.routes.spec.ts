import {
	DEFAULT_ORDER,
	OTHER_ORDER,
} from './../../constants/order.type.constant';
import supertest from 'supertest';
import app from '../../server';
import { NIL as NIL_UUID } from 'uuid';
import { UNIQUE_UUID } from '../../constants/unique.uuid.constant';

const req = supertest(app);

export const ordersEndpointsSpecs = () => {
	describe('├─── Orders Endpoints Suite', () => {
		it('GET (/orders) route response', async () => {
			const res = await req.get('/orders');
			expect(res.statusCode).toBe(200);
		});

		it('POST (/orders/create) route response', async () => {
			// THIS WILL REMAIN IN DB TABLE FOR FURTHER INTEGRATION TESTING:
			await req.post('/orders/create').send(DEFAULT_ORDER);

			const res = await req.post('/orders/create').send(OTHER_ORDER);
			expect(res.statusCode).toBe(200);
		});

		it('GET (/orders/show/:orderID) route response', async () => {
			const res = await req.get(`/orders/show/${NIL_UUID}`);
			expect(res.statusCode).toBe(200);
		});

		it('GET (/orders/showAll) route response', async () => {
			const res = await req.get('/orders/showAll');
			expect(res.statusCode).toBe(200);
		});

		it('UPDATE (/orders/update/:orderID) route response', async () => {
			const res = await req
				.put(`/orders/update/${UNIQUE_UUID}`)
				.send(OTHER_ORDER);
			expect(res.statusCode).toBe(200);
		});

		it('DELETE (/orders/delete/:orderID) route response', async () => {
			const res = await req.delete(`/orders/delete/${UNIQUE_UUID}`);
			expect(res.statusCode).toBe(200);
		});
	});
};
