import supertest from 'supertest';
import app from '../../server';
import { NIL as NIL_UUID } from 'uuid';
import pool from '../../database';
import { PoolClient } from 'pg';

const req = supertest(app);

export const usersEndpointsSpecs = () => {
	describe('├─── Users Endpoints Suite', () => {
		// create users table:
		beforeAll(async () => {
			const client: PoolClient = await pool.connect();
			const sql = `
				CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
				CREATE TABLE IF NOT EXISTS users (
					id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
					first_name VARCHAR(100) NOT NULL,
					last_name VARCHAR(100) NOT NULL,
					user_name VARCHAR(50) NOT NULL,
					email VARCHAR(255) NOT NULL,
					password VARCHAR(100) NOT NULL
				);`;
			await client.query(sql);
			client.release();
		});

		it('GET (/users) route response', async () => {
			const res = await req.get('/users');
			expect(res.statusCode).toBe(200);
		});

		it('POST (/users/create) route response', async () => {
			const res = await req.post('/users/create');
			expect(res.statusCode).toBe(200);
		});

		it('GET (/users/show/:id) route response', async () => {
			const res = await req.get(`/users/show/${NIL_UUID}`);
			expect(res.statusCode).toBe(200);
		});

		it('GET (/users/showAll) route response', async () => {
			const res = await req.get('/users/showAll');
			expect(res.statusCode).toBe(200);
		});

		it('PUT (/users/update/:id) route response', async () => {
			const res = await req.put(`/users/update/${NIL_UUID}`);
			expect(res.statusCode).toBe(200);
		});

		it('DELETE (/users/delete/:id) route response', async () => {
			const res = await req.delete(`/users/delete/${NIL_UUID}`);
			expect(res.statusCode).toBe(200);
		});

		// delete users table:
		afterAll(async () => {
			const client: PoolClient = await pool.connect();
			const sql = 'DROP TABLE users';
			await client.query(sql);
			client.release();
		});
	});
};
