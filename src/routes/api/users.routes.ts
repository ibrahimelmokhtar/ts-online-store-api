import { Router } from 'express';
import * as usersController from '../../controllers/users.controller';
import {
	authenticateUserToken,
	validateUserRole,
} from '../../middlewares/authentication.middleware';
import validateRequest from '../../middlewares/validation.middleware';
import {
	userAuthenticateBodyValidationRules,
	userBodyValidationRules,
	userParamsValidationRules,
} from '../../schemas/users.schemas';

// create Express Router:
const usersRoute: Router = Router();

/**
 * CRUD Operations:
 */

// CREATE NEW USER: (/users/register)
usersRoute
	.route('/register')
	.post(
		userBodyValidationRules,
		validateRequest,
		usersController.createController
	);

// AUTHENTICATE SPECIFIC USER: (/users/login)
usersRoute
	.route('/login')
	.post(
		userAuthenticateBodyValidationRules,
		validateRequest,
		usersController.authenticateController
	);

// READ ALL USERS: (/users)
usersRoute
	.route('/')
	.get(authenticateUserToken, usersController.showAllController);

// MANIPULATE SPECIFIC USER: (/:userID)
usersRoute
	.route('/:userID')
	// READ: (/users/:userID)
	.get(
		userParamsValidationRules,
		validateRequest,
		authenticateUserToken,
		validateUserRole,
		usersController.showController
	)
	// UPDATE: (/users/:userID)
	.put(
		userParamsValidationRules,
		userBodyValidationRules,
		validateRequest,
		authenticateUserToken,
		validateUserRole,
		usersController.updateController
	)
	// DELETE: (/users/:userID)
	.delete(
		userParamsValidationRules,
		validateRequest,
		authenticateUserToken,
		validateUserRole,
		usersController.deleteController
	);

export default usersRoute;
