import supertest from 'supertest';
import app from '../../server';
import { NIL as NIL_UUID } from 'uuid';
import {
	DEFAULT_PRODUCT,
	OTHER_PRODUCT,
} from '../../constants/product.type.constant';
import { UNIQUE_UUID } from '../../constants/unique.uuid.constant';

const req = supertest(app);

export const productsEndpointsSpecs = () => {
	describe('├─── Products Endpoints Suite', () => {
		it('GET (/products) route response', async () => {
			const res = await req.get('/products');
			expect(res.statusCode).toBe(200);
		});

		it('POST (/products/create) route response', async () => {
			// THIS WILL REMAIN IN DB TABLE FOR FURTHER INTEGRATION TESTING:
			await req.post('/products/create').send(DEFAULT_PRODUCT);

			const res = await req.post('/products/create').send(OTHER_PRODUCT);
			expect(res.statusCode).toBe(200);
		});

		it('GET (/products/show/:id) route response', async () => {
			const res = await req.get(`/products/show/${NIL_UUID}`);
			expect(res.statusCode).toBe(200);
		});

		it('GET (/products/showAll) route response', async () => {
			const res = await req.get('/products/showAll');
			expect(res.statusCode).toBe(200);
		});

		it('UPDATE (/products/update/:id) route response', async () => {
			const res = await req
				.put(`/products/update/${UNIQUE_UUID}`)
				.send(OTHER_PRODUCT);
			expect(res.statusCode).toBe(200);
		});

		it('DELETE (/products/delete/:id) route response', async () => {
			const res = await req.delete(`/products/delete/${UNIQUE_UUID}`);
			expect(res.statusCode).toBe(200);
		});
	});
};
