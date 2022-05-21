import { Request, Response, Router } from 'express';
import { DEFAULT_USER } from '../../constants/user.type.constant';
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
 * Render Pages:
 */

// MAIN USERS VIEW:
// SHOW ALL USERS:
usersRoute.route('/').get((_req: Request, res: Response) => {
	res.status(200).render('pages/users/showAllUsers.ejs', {
		user: DEFAULT_USER,
	});
	return;
});

// ADD NEW USER:
usersRoute.route('/add').get((_req: Request, res: Response) => {
	res.status(200).render('pages/users/addUser.ejs', { user: DEFAULT_USER });
	return;
});

// SHOW SPECIFIC USER:
usersRoute.route('/show').get((_req: Request, res: Response) => {
	res.status(200).render('pages/users/showUser.ejs', { user: DEFAULT_USER });
	return;
});

// UPDATE SPECIFIC USER:
usersRoute.route('/update').get((_req: Request, res: Response) => {
	res.status(200).render('pages/users/updateUser.ejs', {
		user: DEFAULT_USER,
	});
	return;
});

// DELETE SPECIFIC USER:
usersRoute.route('/delete').get((_req: Request, res: Response) => {
	res.status(200).render('pages/users/deleteUser.ejs', {
		user: DEFAULT_USER,
	});
	return;
});

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
