import { body, param } from 'express-validator';

export const orderBodyValidationRules = [
	body('userID')
		.isUUID(4)
		.withMessage('Order`s user ID is NOT UUID')
		.exists()
		.withMessage('Order`s user ID is required')
		.notEmpty()
		.withMessage('Order`s user ID is empty'),

	body('isDone')
		.exists()
		.withMessage('Order`s status is required')
		.notEmpty()
		.withMessage('Order`s status is empty')
		.isBoolean()
		.withMessage('Order`s status must be a boolean (true or false)'),
];

export const orderParamsValidationRules = [
	param('orderID')
		.isUUID(4)
		.withMessage('Order`s ID is NOT UUID')
		.exists()
		.withMessage('Order`s ID is required')
		.notEmpty()
		.withMessage('Order`s ID is empty'),
];
