import { body, param } from 'express-validator';

export const productBodyValidationRules = [
	body('name')
		.exists()
		.withMessage('Product`s name is required')
		.notEmpty()
		.withMessage('Product`s name is empty')
		.isLength({ max: 100 })
		.withMessage('Product`s name MAX length is 100'),

	body('price')
		.exists()
		.withMessage('Product`s price is required')
		.notEmpty()
		.withMessage('Product`s price is empty')
		.toFloat()
		.isNumeric()
		.withMessage('Product`s price must be a number')
		.isFloat({ min: 0.1 })
		.withMessage('Product`s price MIN value is 0.1'),

	body('category')
		.exists()
		.withMessage('Product`s category is required')
		.notEmpty()
		.withMessage('Product`s category is empty')
		.isLength({ max: 50 })
		.withMessage('Product`s category MAX length is 50'),
];

export const productParamsValidationRules = [
	param('productID')
		.isUUID(4)
		.withMessage('Product`s ID is NOT UUID')
		.exists()
		.withMessage('Product`s ID is required')
		.notEmpty()
		.withMessage('Product`s ID is empty'),
];
