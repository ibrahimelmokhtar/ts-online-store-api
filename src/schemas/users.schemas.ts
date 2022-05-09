import { body, param } from 'express-validator';

export const userBodyValidationRules = [
	body('firstName')
		.exists()
		.withMessage('User`s first name is required')
		.notEmpty()
		.withMessage('User`s first name is empty')
		.isLength({ max: 100 })
		.withMessage('User`s first name MAX length is 100'),

	body('lastName')
		.exists()
		.withMessage('User`s last name is required')
		.notEmpty()
		.withMessage('User`s last name is empty')
		.isLength({ max: 100 })
		.withMessage('User`s last name MAX length is 100'),

	body('userName')
		.exists()
		.withMessage('User`s user name is required')
		.notEmpty()
		.withMessage('User`s user name is empty')
		.isLength({ max: 50 })
		.withMessage('User`s user name MAX length is 50'),

	body('email')
		.exists()
		.withMessage('User`s email is required')
		.notEmpty()
		.withMessage('User`s email is empty')
		.isEmail()
		.withMessage('User`s email is NOT a valid email structure')
		.isLength({ max: 255 })
		.withMessage('User`s email MAX length is 255'),

	body('password')
		.exists()
		.withMessage('User`s password is required')
		.notEmpty()
		.withMessage('User`s password is empty')
		.isLength({ max: 100 })
		.withMessage('User`s password MAX length is 100'),
];

export const userParamsValidationRules = [
	param('userID')
		.isUUID(4)
		.withMessage('User`s ID is NOT UUID')
		.exists()
		.withMessage('User`s ID is required')
		.notEmpty()
		.withMessage('User`s ID is empty'),
];
