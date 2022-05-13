import { body } from 'express-validator';

export const orderProductBodyValidationRules = [
	body('product_id')
		.isUUID(4)
		.withMessage('Product`s ID is NOT UUID')
		.exists()
		.withMessage('Product`s ID is required')
		.notEmpty()
		.withMessage('Product`s ID is empty'),

	body('product_quantity')
		.exists()
		.withMessage('Product`s quantity is required')
		.notEmpty()
		.withMessage('Product`s quantity is empty')
		.toInt()
		.isNumeric()
		.withMessage('Product`s quantity must be a number')
		.isInt({ min: 1 })
		.withMessage('Product`s MIN quantity is 1'),
];
