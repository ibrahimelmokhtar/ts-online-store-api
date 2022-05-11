import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import config from '../config/env.config';

/**
 * @description Check Authorization Header type.
 * @param {string} authHeader
 * @param {string} authType
 * @returns {boolean}
 */
const checkAuthType = (authHeader: string, authType: string): boolean => {
	let isBearer = false;

	// check authorization header type AND there is a token provided:
	if (
		authHeader.split(' ')[0].toLowerCase() === authType.toLowerCase() &&
		authHeader.split(' ')[1]
	) {
		isBearer = true;
	}

	return isBearer;
};

/**
 * @description Extract token value from Authorization Header.
 * @param {string} authHeader
 * @returns {string} Extracted token.
 */
const extractToken = (authHeader: string): string => {
	return authHeader.split(' ')[1];
};

/**
 * @description Validate request body.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const authenticateUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		// obtain authorization token from request headers:
		const authorizationHeader = req.headers.authorization;
		// check authorization header existence:
		if (!authorizationHeader) {
			res.status(401).json({
				status: '401 Unauthorized',
				message: 'No token provided.',
			});
			return;
		}

		// check authorization header type to be Bearer type:
		const isBearer: boolean = checkAuthType(authorizationHeader, 'Bearer');
		// check authorization header type:
		if (!isBearer) {
			res.status(400).json({
				status: 'Error 400: Bad Request',
				message: 'Token type is NOT "Bearer".',
			});
			return;
		}

		// extract the token from the authorization header:
		const token = extractToken(authorizationHeader);

		// verify extracted token:
		const payload = jwt.verify(
			token,
			config.tokenSecret as string
		) as JwtPayload;

		// check returned payload:
		if (!payload) {
			res.status(401).json({
				status: 'Error 401: Unauthorized',
				message: 'Token is NOT valid.',
			});
			return;
		}

		// proceed to next middleware:
		next();
	} catch (error) {
		console.error(
			`Authentication Middleware Error: Unable to login: ${
				(error as Error).message
			}`
		);
	}
};
