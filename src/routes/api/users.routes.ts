import { Request, Response, Router } from 'express';
import * as usersController from '../../controllers/users.controller';
import validateRequest from '../../middlewares/validator.middleware';
import {
	userAuthenticateBodyValidationRules,
	userBodyValidationRules,
	userParamsValidationRules,
} from '../../schemas/users.schemas';

// create Express Router:
const usersRoute: Router = Router();

// sample GET method from users route:
usersRoute.get('/', async (_req: Request, res: Response): Promise<void> => {
	res.json({
		message: 'inside << users >> route',
		possibleRoutes: [
			'/create',
			'/show/:userID',
			'/showAll',
			'/update/:userID',
			'/delete/:userID',
			'/signin',
		],
	});
});

// available routes for CRUD operations within /users route:

// CREATE ONE:
usersRoute.post(
	'/create',
	userBodyValidationRules,
	validateRequest,
	usersController.createController
);

// READ ONE:
usersRoute.get(
	'/show',
	userParamsValidationRules,
	validateRequest,
	(_req: Request, res: Response) => {
		res.json({
			message: 'User ID is required ...',
		}).end();
	}
);

usersRoute.get(
	'/show/:userID',
	userParamsValidationRules,
	validateRequest,
	usersController.showController
);

// READ ALL:
usersRoute.get('/showAll', usersController.showAllController);

// UPDATE ONE:
usersRoute.put(
	'/update',
	userParamsValidationRules,
	validateRequest,
	(_req: Request, res: Response) => {
		res.json({
			message: 'User ID is required ...',
		}).end();
	}
);

usersRoute.put(
	'/update/:userID',
	userParamsValidationRules,
	userBodyValidationRules,
	validateRequest,
	usersController.updateController
);

// DELETE ONE:
usersRoute.delete(
	'/delete',
	userParamsValidationRules,
	validateRequest,
	(_req: Request, res: Response) => {
		res.json({
			message: 'User ID is required ...',
		}).end();
	}
);

usersRoute.delete(
	'/delete/:userID',
	userParamsValidationRules,
	validateRequest,
	usersController.deleteController
);

// AUTHENTICATE ONE:
usersRoute.post(
	'/signin',
	userAuthenticateBodyValidationRules,
	validateRequest,
	usersController.authenticateController
);

export default usersRoute;
