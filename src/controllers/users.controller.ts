import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import User from '../types/user.type';
import jwt from 'jsonwebtoken';
import config from '../config/env.config';
import OrdersPerUser from '../types/dashboard/ordersPerUser.type';
import Dashboard from '../services/dashboard.services';

// create new object from UserModel:
const userModel = new UserModel();

// create new object from Dashboard:
const dashboard = new Dashboard();

/**
 * @description Check user existence within the database via specific info (email or id).
 * @param {Request} req
 * @returns {boolean} User's existence status (true: is found, false: is NOT found).
 */
export const checkExistenceController = async (
	req: Request
): Promise<boolean | void> => {
	try {
		// check req.body values to see if (email) key exists:
		const isEmail: boolean = req.body.email ? true : false;

		// extract search keyword:
		let info: string = req.body.email;
		if (!isEmail) {
			info = req.params.userID;
		}

		// check user's existence:
		const isFound: boolean = (await userModel.checkUserExistence(
			info,
			isEmail
		)) as boolean;

		return isFound;
	} catch (error) {
		console.error(
			`User Controller: Error while checking user: ${
				(error as Error).message
			}`
		);
	}
};

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
		// check user's existence:
		const isFound: boolean = (await checkExistenceController(
			req
		)) as unknown as boolean;

		if (isFound) {
			res.status(409)
				.json({
					status: 'Error 409: Conflict',
					message: 'User email already exists.',
				})
				.end();
			return;
		}

		// use user model to create the new User object ...
		// then save it within a specific DB table:
		const user: User = (await userModel.create(req.body)) as User;

		// handle unexpected error:
		if (!user) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					user: {},
					message: `Unable to create user with email: ${req.body.email}`,
				})
				.end();
			return;
		}

		// send a response back to the user:
		res.status(201)
			.json({
				status: '201 Created',
				user: user,
				message: 'User created successfully.',
			})
			.end();
		return;
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
		// check user's existence:
		const isFound: boolean = (await checkExistenceController(
			req
		)) as unknown as boolean;

		if (!isFound) {
			res.status(404)
				.json({
					status: 'Error 404: Not Found',
					message: 'User is NOT found.',
				})
				.end();
			return;
		}

		// use user model to show a specific User object:
		const user: User = (await userModel.show(req.params.userID)) as User;

		// handle unexpected error:
		if (!user) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					user: {},
					message: `Unable to show user no. ${req.params.userID}`,
				})
				.end();
			return;
		}

		// use dashboard class to show a specific OrdersPerUser objects:
		const recentOrders: Array<OrdersPerUser> =
			(await dashboard.showOrdersPerUser(
				req.params.userID
			)) as Array<OrdersPerUser>;

		// handle unexpected error:
		if (!recentOrders) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					recentOrders: {},
					message: `Unable to show orders per user no. ${req.params.userID}`,
				})
				.end();
			return;
		}

		// send a response back to the user:
		res.status(200)
			.json({
				status: '200 Ok',
				user: {
					...user,
					recentOrders,
				},
				message: 'User shown successfully.',
			})
			.end();
		return;
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
		const users: Array<User> = (await userModel.showAll()) as Array<User>;

		// handle unexpected error:
		if (!users) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					users: {},
					message: 'Unable to show users.',
				})
				.end();
			return;
		}

		// send a response back to the user:
		res.status(200)
			.json({
				status: '200 Ok',
				totalUsers: users?.length,
				users: users,
				message: 'Users shown successfully.',
			})
			.end();
		return;
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
		// check user's existence:
		const isFound: boolean = (await checkExistenceController(
			req
		)) as unknown as boolean;

		if (!isFound) {
			res.status(404)
				.json({
					status: 'Error 404: Not Found',
					message: 'User is NOT found.',
				})
				.end();
			return;
		}

		// use user model to update a specific User object ...
		// then save it within a specific DB table:
		const user: User = (await userModel.update(
			req.params.userID,
			req.body
		)) as User;

		// handle unexpected error:
		if (!user) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					user: {},
					message: `Unable to update user no. ${req.params.userID}`,
				})
				.end();
			return;
		}

		// send a response back to the user:
		res.status(200)
			.json({
				status: '200 Ok',
				user: user,
				message: 'User updated successfully.',
			})
			.end();
		return;
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
		// check user's existence:
		const isFound: boolean = (await checkExistenceController(
			req
		)) as unknown as boolean;

		if (!isFound) {
			res.status(404)
				.json({
					status: 'Error 404: Not Found',
					message: 'User is NOT found.',
				})
				.end();
			return;
		}

		// use user model to delete a specific User object:
		const user: User = (await userModel.delete(req.params.userID)) as User;

		// handle unexpected error:
		if (!user) {
			res.status(500)
				.json({
					status: 'Error 500: Internal Server Error',
					user: {},
					message: `Unable to delete user no. ${req.params.userID}`,
				})
				.end();
			return;
		}

		// send a response back to the user:
		res.status(200)
			.json({
				status: '200 Ok',
				user: user,
				message: 'User deleted successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`User Controller: Error while deleting user: ${
				(error as Error).message
			}`
		);
	}
};

/**
 * @description Authenticate a specific User object within the database.
 * @param {Request} req
 * @param {Response} res
 */
export const authenticateController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// check user's existence:
		const isFound: boolean = (await checkExistenceController(
			req
		)) as unknown as boolean;

		if (!isFound) {
			res.status(404)
				.json({
					status: 'Error 404: Not Found',
					message: 'User is NOT found.',
				})
				.end();
			return;
		}

		// use user model to authenticate a specific User object:
		const user: User = (await userModel.authenticate(
			req.body.email,
			req.body.password
		)) as User;

		if (!user) {
			res.status(400)
				.json({
					status: 'Error 400: Bad Request',
					message: 'User email and/or password are wrong.',
				})
				.end();
			return;
		}

		// create user token:
		const token = jwt.sign({ user }, config.tokenSecret as string);

		// send a response back to the user:
		res.status(202)
			.json({
				status: '202 Accepted',
				user: { ...user, token },
				message: 'User authenticated successfully.',
			})
			.end();
		return;
	} catch (error) {
		console.error(
			`User Controller: Error while authenticating user: ${
				(error as Error).message
			}`
		);
	}
};
