import supertest from 'supertest';
import app from '../../server';
import { NIL as NIL_UUID } from 'uuid';
import pool from '../../database';
import { PoolClient } from 'pg';

const req = supertest(app);

export const productsEndpointsSpecs = () => {
	describe('├─── Products Endpoints Suite', () => {
		// create products table:
		beforeAll(async () => {
			const client: PoolClient = await pool.connect();
			const sql = `
				CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
				CREATE TABLE IF NOT EXISTS products (
					id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
					name VARCHAR(100) NOT NULL,
					price FLOAT NOT NULL,
					category VARCHAR(50) NOT NULL
				);`;
			await client.query(sql);
			client.release();
		});

		it('GET (/products) route response', async () => {
			const res = await req.get('/products');
			expect(res.statusCode).toBe(200);
		});

		it('POST (/products/create) route response', async () => {
			const res = await req.post('/products/create');
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
			const res = await req.put(`/products/update/${NIL_UUID}`);
			expect(res.statusCode).toBe(200);
		});

		it('DELETE (/products/delete/:id) route response', async () => {
			const res = await req.delete(`/products/delete/${NIL_UUID}`);
			expect(res.statusCode).toBe(200);
		});

		// delete products table:
		afterAll(async () => {
			const client: PoolClient = await pool.connect();
			const sql = 'DROP TABLE products';
			await client.query(sql);
			client.release();
		});
	});
};
