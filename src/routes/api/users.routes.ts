import { Request, Response, Router } from 'express';
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

// sample GET method from users route:
usersRoute.get('/', async (_req: Request, res: Response): Promise<void> => {
	res.status(404)
		.json({
			status: 'Error 404: Not Found',
			message: 'inside << users >> route',
			possibleRoutes: [
				'/create',
				'/show/:userID',
				'/showAll',
				'/update/:userID',
				'/delete/:userID',
				'/signin',
			],
		})
		.end();
	return;
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
	async (_req: Request, res: Response): Promise<void> => {
		res.status(404)
			.json({
				status: 'Error 404: Not Found',
				message: 'User ID is required.',
			})
			.end();
		return;
	}
);

usersRoute.get(
	'/show/:userID',
	userParamsValidationRules,
	validateRequest,
	authenticateUser,
	usersController.showController
);

// READ ALL:
usersRoute.get('/showAll', authenticateUser, usersController.showAllController);

// UPDATE ONE:
usersRoute.put(
	'/update',
	userParamsValidationRules,
	validateRequest,
	async (_req: Request, res: Response): Promise<void> => {
		res.status(404)
			.json({
				status: 'Error 404: Not Found',
				message: 'User ID is required.',
			})
			.end();
		return;
	}
);

usersRoute.put(
	'/update/:userID',
	userParamsValidationRules,
	userBodyValidationRules,
	validateRequest,
	authenticateUser,
	usersController.updateController
);

// DELETE ONE:
usersRoute.delete(
	'/delete',
	userParamsValidationRules,
	validateRequest,
	async (_req: Request, res: Response): Promise<void> => {
		res.status(404)
			.json({
				status: 'Error 404: Not Found',
				message: 'User ID is required ...',
			})
			.end();
		return;
	}
);

usersRoute.delete(
	'/delete/:userID',
	userParamsValidationRules,
	validateRequest,
	authenticateUser,
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
