import { Router } from 'express';
import * as usersController from '../../controllers/users.controller';
import { authenticateUser } from '../../middlewares/authentication.middleware';
import validateRequest from '../../middlewares/validation.middleware';
import {
	userAuthenticateBodyValidationRules,
	userBodyValidationRules,
	userParamsValidationRules,
} from '../../schemas/users.schemas';

// create Express Router:
const usersRoute: Router = Router();

// CREATE NEW USER: (/users/signup)
usersRoute
	.route('/signup')
	.post(
		userBodyValidationRules,
		validateRequest,
		usersController.createController
	);

// AUTHENTICATE SPECIFIC USER: (/users/signin)
usersRoute
	.route('/signin')
	.post(
		userAuthenticateBodyValidationRules,
		validateRequest,
		usersController.authenticateController
	);

// READ ALL USERS: (/users)
usersRoute.route('/').get(authenticateUser, usersController.showAllController);

// MANIPULATE SPECIFIC USER: (/:userID)
usersRoute
	.route('/:userID')
	// READ: (/users/:userID)
	.get(
		userParamsValidationRules,
		validateRequest,
		authenticateUser,
		usersController.showController
	)
	// UPDATE: (/users/:userID)
	.put(
		userParamsValidationRules,
		userBodyValidationRules,
		validateRequest,
		authenticateUser,
		usersController.updateController
	)
	// DELETE: (/users/:userID)
	.delete(
		userParamsValidationRules,
		validateRequest,
		authenticateUser,
		usersController.deleteController
	);

export default usersRoute;
