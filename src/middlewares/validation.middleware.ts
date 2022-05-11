import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

/**
 * @description Validate request body.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const validateRequest = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);

	if (!errors.isEmpty() && process.env.NODE_ENV !== 'test') {
		return res
			.status(400)
			.json({ errors: errors.array({ onlyFirstError: true }) });
	}

	next();
};

export default validateRequest;
