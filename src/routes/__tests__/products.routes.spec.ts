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
		beforeAll(async () => {
			// this is required to generate token:
			const resUser = await req.post('/users/signin').send(DEFAULT_USER);
			// set token value:
			token += resUser.body.user.token;
		});

		it('POST (/products/create) --> 201 Created - [Create New Product]', async () => {
			// THIS WILL REMAIN IN DB TABLE FOR FURTHER INTEGRATION TESTING:
			await req
				.post('/products/create')
				.send(DEFAULT_PRODUCT)
				.set('Authorization', token);

			const res = await req
				.post('/products/create')
				.send(OTHER_PRODUCT)
				.set('Authorization', token);

			// 201 Created
			expect(res.statusCode).toBe(201);
		});

		it('GET (/products/:productID) --> 200 Ok - [Show Specific Product]', async () => {
			const res = await req
				.get(`/products/${NIL_UUID}`)
				.set('Authorization', token);

			// 200 Ok
			expect(res.statusCode).toBe(200);
		});

		it('GET (/products) --> 200 Ok - [Show All Products]', async () => {
			const res = await req.get('/products').set('Authorization', token);

			// 200 Ok
			expect(res.statusCode).toBe(200);
		});

		it('UPDATE (/products/:productID) --> 200 Ok - [Update Specific Product]', async () => {
			const res = await req
				.put(`/products/${UNIQUE_UUID}`)
				.set('Authorization', token)
				.send(OTHER_PRODUCT);

			// 200 Ok
			expect(res.statusCode).toBe(200);
		});

		it('DELETE (/products/:productID) --> 200 Ok - [Delete Specific Product]', async () => {
			const res = await req
				.delete(`/products/${UNIQUE_UUID}`)
				.set('Authorization', token);

			// 200 Ok
			expect(res.statusCode).toBe(200);
		});
	});
};
