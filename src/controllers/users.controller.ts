import { Request, Response } from 'express';
import { DEFAULT_USER } from '../constants/user.type.constant';
import UserModel from '../models/user.model';
import User from '../types/user.type';

// create new object from UserModel:
const userModel = new UserModel();

/**
 * @description Create new User object then save it within the database.
 * @param {Request} req
 * @param {Response} res
 */
export const createController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// use DEFAULT_USER while testing:
		if (process.env.NODE_ENV === 'test') {
			req.body = DEFAULT_USER;
		}

		// use user model to create the new User object ...
		// then save it within a specific DB table:
		const user: User = (await userModel.create(req.body)) as User;

		// send a response back to the user:
		res.json({
			status: 'success',
			data: user,
			message: 'User created successfully.',
		}).end();
	} catch (error) {
		console.error(
			`User Controller: Error while creating new user: ${
				(error as Error).message
			}`
		);
	}
};

/**
 * @description Show a specific User object from the database.
 * @param {Request} req
 * @param {Response} res
 */
export const showController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// use user model to show a specific User object:
		const user: User = (await userModel.show(req.params.id)) as User;

		// send a response back to the user:
		res.json({
			status: 'success',
			data: user,
			message: 'User shown successfully.',
		}).end();
	} catch (error) {
		console.error(
			`User Controller: Error while showing user: ${
				(error as Error).message
			}`
		);
	}
};

/**
 * @description Show all User objects from the database.
 * @param {Request} _req
 * @param {Response} res
 */
export const showAllController = async (
	_req: Request,
	res: Response
): Promise<void> => {
	try {
		// use user model to show all User objects:
		const users: Array<User> =
			(await userModel.showAllUsers()) as Array<User>;

		// send a response back to the user:
		res.json({
			status: 'success',
			totalUsers: users?.length,
			data: users,
			message: 'Users shown successfully.',
		}).end();
	} catch (error) {
		console.error(
			`User Controller: Error while showing users: ${
				(error as Error).message
			}`
		);
	}
};

/**
 * @description Update a specific User object then save it within the database.
 * @param {Request} req
 * @param {Response} res
 */
export const updateController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// use DEFAULT_USER while testing:
		if (process.env.NODE_ENV === 'test') {
			req.body = DEFAULT_USER;
		}

		// use user model to update a specific User object ...
		// then save it within a specific DB table:
		const user: User = (await userModel.update(
			req.params.id,
			req.body
		)) as User;

		// send a response back to the user:
		res.json({
			status: 'success',
			data: user,
			message: 'User updated successfully.',
		}).end();
	} catch (error) {
		console.error(
			`User Controller: Error while updating user: ${
				(error as Error).message
			}`
		);
	}
};

/**
 * @description Delete a specific User object from the database.
 * @param {Request} req
 * @param {Response} res
 */
export const deleteController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// use user model to delete a specific User object:
		const user: User = (await userModel.delete(req.params.id)) as User;

		// send a response back to the user:
		res.json({
			status: 'success',
			data: user,
			message: 'User deleted successfully.',
		}).end();
	} catch (error) {
		console.error(
			`User Controller: Error while deleting user: ${
				(error as Error).message
			}`
		);
	}
};
