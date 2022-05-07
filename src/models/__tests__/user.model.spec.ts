import { PoolClient } from 'pg';
import pool from '../../database';
import User from '../../types/user.type';
import UserModel from '../user.model';
import { NIL as NIL_UUID } from 'uuid';

const userModel = new UserModel();

export const userModelSpecs = () => {
	describe('├─── User Model Suite', () => {
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

		it('creates new user within the database', async () => {
			const user: User = {
				id: NIL_UUID,
				firstName: 'first_name',
				lastName: 'last_name',
				userName: 'user_name',
				email: 'test@test.com',
				password: 'password',
			};
			const createdUser: User = (await userModel.create(user)) as User;

			expect(createdUser.email).toEqual(user.email);
		});

		it('shows a specific user from the database', async () => {
			const user: User = (await userModel.show(NIL_UUID)) as User;

			expect(user.id).toEqual(NIL_UUID);
		});

		it('shows all users from the database', async () => {
			const users: User[] = (await userModel.showAllUsers()) as User[];

			expect(users.length).toEqual(1);
		});

		it('updates a specific user within the database', async () => {
			const user: User = {
				id: NIL_UUID,
				firstName: 'first_name',
				lastName: 'last_name',
				userName: 'user_name',
				email: 'email@email.com',
				password: 'password',
			};

			const updatedUser: User = (await userModel.update(
				user.id as string,
				user
			)) as User;

			expect(updatedUser.email).toEqual(user.email);
		});

		it('deletes a specific user from the database', async () => {
			const user: User = (await userModel.delete(NIL_UUID)) as User;

			expect(user.id).toEqual(NIL_UUID);
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
