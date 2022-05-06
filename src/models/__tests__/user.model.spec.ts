import { PoolClient } from 'pg';
import pool from '../../database';
import User from '../../types/user.type';
import UserModel from '../user.model';

const userModel = new UserModel();

describe('User Model Suite', () => {
	// create users table:
	beforeAll(async () => {
		const client: PoolClient = await pool.connect();
		const sql = `
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            user_name VARCHAR(50) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(100) NOT NULL
        )`;
		await client.query(sql);
	});

	it('creates new user within the database', async () => {
		const user: User = {
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
		const user: User = (await userModel.show(1)) as User;

		expect(user.id as unknown as number).toEqual(1);
	});

	it('shows all users from the database', async () => {
		const users: User[] = (await userModel.showAllUsers()) as User[];

		expect(users.length).toEqual(1);
	});

	it('updates a specific user within the database', async () => {
		const user: User = {
			id: '1',
			firstName: 'first_name',
			lastName: 'last_name',
			userName: 'user_name',
			email: 'email@email.com',
			password: 'password',
		};

		const updatedUser: User = (await userModel.update(
			user.id as unknown as number,
			user
		)) as User;

		expect(updatedUser.email).toEqual(user.email);
	});

	it('deletes a specific user from the database', async () => {
		const user: User = (await userModel.delete(1)) as User;

		expect(user.id as unknown as number).toEqual(1);
	});

	// delete users table:
	afterAll(async () => {
		const client: PoolClient = await pool.connect();
		const sql = 'DROP TABLE users';
		await client.query(sql);
	});
});
