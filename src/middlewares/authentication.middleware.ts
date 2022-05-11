import jwt from 'jsonwebtoken';
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
const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
	try {
		// obtain authorization token from request headers:
		const authorizationHeader = req.headers.authorization;

		// check authorization header existence:
		if (authorizationHeader !== undefined) {
			// check authorization header type to be Bearer type:
			const isBearer: boolean = checkAuthType(
				authorizationHeader,
				'Bearer'
			);
			// check authorization header type:
			if (isBearer) {
				// extract the token from the authorization header:
				const token = extractToken(authorizationHeader);

				// verify extracted token:
				const isValid = jwt.verify(token, config.tokenSecret as string);

				// check token is valid:
				if (isValid) {
					next();
				} else {
					return res.status(400).json({
						message:
							'Authentication Middleware Error: Token is NOT valid',
					});
					// console.error(
					// 	'Authentication Middleware Error: Token is NOT valid'
					// );
				}
			} else {
				return res.status(400).json({
					message:
						'Authentication Middleware Error: Token type is NOT "Bearer"',
				});
				// console.error(
				// 	'Authentication Middleware Error: Token type is NOT "Bearer"'
				// );
			}
		} else {
			return res.status(400).json({
				message: 'Authentication Middleware Error: No token provided',
			});
			// console.error('Authentication Middleware Error: No token provided');
		}
	} catch (error) {
		return res.status(400).json({
			message: `Authentication Middleware Error: Unable to login: ${
				(error as Error).message
			}`,
		});
		// console.error(
		// 	`AuthMiddleware Error: Unable to login: ${(error as Error).message}`
		// );
	}
};

export default authenticateUser;
