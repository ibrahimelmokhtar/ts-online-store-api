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

	body('productsIDs')
		.exists()
		.withMessage('Order`s products IDs is required')
		.notEmpty()
		.withMessage('Order`s products IDs is empty')
		.toArray()
		.isArray({ min: 1 })
		.withMessage('Order`s products IDs MIN length is 1'),

	body('productsQuantities')
		.exists()
		.withMessage('Order`s products quantities is required')
		.notEmpty()
		.withMessage('Order`s products quantities is empty')
		.toArray()
		.withMessage('Order`s products quantities must be an array')
		.isArray({ min: 1 })
		.withMessage('Order`s products quantities MIN length is 1')
		.custom((value, { req }) => {
			return value.length === req.body.productsIDs.length;
		})
		.withMessage(
			'Order`s products quantities array length MUST EQUAL products IDs array length'
		),
];

export const orderStatusBodyValidationRules = [
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
