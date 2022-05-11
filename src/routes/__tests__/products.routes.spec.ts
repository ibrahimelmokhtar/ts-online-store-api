import supertest from 'supertest';
import app from '../../server';
import { NIL as NIL_UUID } from 'uuid';
import {
	DEFAULT_PRODUCT,
	OTHER_PRODUCT,
} from '../../constants/product.type.constant';
import { UNIQUE_UUID } from '../../constants/unique.uuid.constant';
import { DEFAULT_USER } from '../../constants/user.type.constant';

const req = supertest(app);

export const productsEndpointsSpecs = () => {
	describe('├─── Products Endpoints Suite', () => {
		let token: string = 'Bearer ';
		it('GET (/products) route response', async () => {
			// this is required to generate token:
			const resUser = await req.post('/users/signin').send(DEFAULT_USER);
			// set token value:
			token += resUser.body.data.token;

			const res = await req.get('/products');
			expect(res.statusCode).toBe(200);
		});

		it('POST (/products/create) route response', async () => {
			// THIS WILL REMAIN IN DB TABLE FOR FURTHER INTEGRATION TESTING:
			await req
				.post('/products/create')
				.send(DEFAULT_PRODUCT)
				.set('Authorization', token);

			const res = await req
				.post('/products/create')
				.send(OTHER_PRODUCT)
				.set('Authorization', token);
			expect(res.statusCode).toBe(200);
		});

		it('GET (/products/show/:productID) route response', async () => {
			const res = await req
				.get(`/products/show/${NIL_UUID}`)
				.set('Authorization', token);
			expect(res.statusCode).toBe(200);
		});

		it('GET (/products/showAll) route response', async () => {
			const res = await req
				.get('/products/showAll')
				.set('Authorization', token);
			expect(res.statusCode).toBe(200);
		});

		it('UPDATE (/products/update/:productID) route response', async () => {
			const res = await req
				.put(`/products/update/${UNIQUE_UUID}`)
				.set('Authorization', token)
				.send(OTHER_PRODUCT);
			expect(res.statusCode).toBe(200);
		});

		it('DELETE (/products/delete/:productID) route response', async () => {
			const res = await req
				.delete(`/products/delete/${UNIQUE_UUID}`)
				.set('Authorization', token);
			expect(res.statusCode).toBe(200);
		});
	});
};
