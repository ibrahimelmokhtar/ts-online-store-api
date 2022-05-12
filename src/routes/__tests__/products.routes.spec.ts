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
		it('GET (/products) - 404 Not Found', async () => {
			// this is required to generate token:
			const resUser = await req.post('/users/signin').send(DEFAULT_USER);
			// set token value:
			token += resUser.body.data.token;

			const res = await req.get('/products');

			// 404 Not Found
			expect(res.statusCode).toBe(404);
		});

		it('POST (/products/create) - 201 Created', async () => {
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

		it('GET (/products/show/:productID) - 200 Ok', async () => {
			const res = await req
				.get(`/products/show/${NIL_UUID}`)
				.set('Authorization', token);

			// 200 Ok
			expect(res.statusCode).toBe(200);
		});

		it('GET (/products/showAll) - 200 Ok', async () => {
			const res = await req
				.get('/products/showAll')
				.set('Authorization', token);

			// 200 Ok
			expect(res.statusCode).toBe(200);
		});

		it('UPDATE (/products/update/:productID) - 200 Ok', async () => {
			const res = await req
				.put(`/products/update/${UNIQUE_UUID}`)
				.set('Authorization', token)
				.send(OTHER_PRODUCT);

			// 200 Ok
			expect(res.statusCode).toBe(200);
		});

		it('DELETE (/products/delete/:productID) - 200 Ok', async () => {
			const res = await req
				.delete(`/products/delete/${UNIQUE_UUID}`)
				.set('Authorization', token);

			// 200 Ok
			expect(res.statusCode).toBe(200);
		});
	});
};
