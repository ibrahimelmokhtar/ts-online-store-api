import User from '../types/user.type';
import pool from '../database';
import { PoolClient } from 'pg';
import { encrypt } from '../helpers/guards/encrypt';

class UserModel {
	/**
	 * @description Create new User within the database.
	 * @param {User} user
	 * @returns {User} Created User object.
	 */
	create = async (user: User): Promise<User | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			let sql: string = 'EMPTY SQL QUERY';
			let sentValues: Array<string> = [];
			if (process.env.NODE_ENV === 'test') {
				sql =
					'INSERT INTO users (id, first_name, last_name, user_name, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
				sentValues = [
					user.id as string,
					user.firstName,
					user.lastName,
					user.userName,
					user.email,
					encrypt(user.password),
				];
			} else {
				sql =
					'INSERT INTO users (first_name, last_name, user_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *';
				sentValues = [
					user.firstName,
					user.lastName,
					user.userName,
					user.email,
					encrypt(user.password),
				];
			}
			const result = await client.query(sql, sentValues);

			// release connection:
			client.release();

			// return created user:
			return result.rows[0];
		} catch (error) {
			if (process.env.NODE_ENV !== 'test') {
				console.error(
					`User Model: Unable to create ${user.userName}: ${
						(error as Error).message
					}`
				);
			}
		}
	};

	/**
	 * @description Show a specific User from the database.
	 * @param {string} userID
	 * @returns {User} Desired User object.
	 */
	show = async (userID: string): Promise<User | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			const sql: string = 'SELECT * FROM users WHERE id=($1)';
			const result = await client.query(sql, [userID]);

			// release connection:
			client.release();

			// return a specific user:
			return result.rows[0];
		} catch (error) {
			if (process.env.NODE_ENV !== 'test') {
				console.error(
					`User Model: Unable to show ${userID}: ${
						(error as Error).message
					}`
				);
			}
		}
	};

	/**
	 * @description Show all User objects from the database.
	 * @returns {User[]} Array of User objects.
	 */
	showAllUsers = async (): Promise<User[] | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			const sql: string = 'SELECT * FROM users';
			const result = await client.query(sql);

			// release connection:
			client.release();

			// return all users:
			return result.rows;
		} catch (error) {
			if (process.env.NODE_ENV !== 'test') {
				console.error(
					`User Model: Unable to show users: ${
						(error as Error).message
					}`
				);
			}
		}
	};

	/**
	 * @description Update a specific User object.
	 * @param {string} userID
	 * @param {User} user
	 * @returns {User} Updated User object.
	 */
	update = async (userID: string, user: User): Promise<User | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			const sql: string =
				'UPDATE users SET first_name=($2), last_name=($3), user_name=($4), email=($5), password=($6) WHERE id=($1) RETURNING *';
			const result = await client.query(sql, [
				userID,
				user.firstName,
				user.lastName,
				user.userName,
				user.email,
				encrypt(user.password),
			]);

			// release connection:
			client.release();

			// return updated user:
			return result.rows[0];
		} catch (error) {
			if (process.env.NODE_ENV !== 'test') {
				console.error(
					`User Model: Unable to update ${userID}: ${
						(error as Error).message
					}`
				);
			}
		}
	};

	/**
	 * @description Delete a specific User object.
	 * @param {string} userID
	 * @returns {User} Deleted User object.
	 */
	delete = async (userID: string): Promise<User | void> => {
		try {
			// connect to database:
			const client: PoolClient = await pool.connect();

			// run desired query:
			const sql: string = 'DELETE FROM users WHERE id=($1) RETURNING *';
			const result = await client.query(sql, [userID]);

			// release connection:
			client.release();

			// return deleted user:
			return result.rows[0];
		} catch (error) {
			if (process.env.NODE_ENV !== 'test') {
				console.error(
					`User Model: Unable to delete ${userID}: ${
						(error as Error).message
					}`
				);
			}
		}
	};
}

export default UserModel;
