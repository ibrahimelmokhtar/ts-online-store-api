import { Request, Response, Router } from 'express';
import * as usersController from '../../controllers/users.controller';
import validateRequest from '../../middlewares/validator.middleware';
import {
	userBodyValidationRules,
	userParamsValidationRules,
} from '../../schemas/users.schemas';

// create Express Router:
const usersRoute: Router = Router();

// sample GET method from users route:
usersRoute.get('/', async (_req: Request, res: Response): Promise<void> => {
	res.json({ message: 'inside << users >> route' });
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
usersRoute.get('/show', (_req: Request, res: Response) => {
	res.json({
		message: 'User ID is required ...',
	});
});

usersRoute.get(
	'/show/:id',
	userParamsValidationRules,
	validateRequest,
	usersController.showController
);

// READ ALL:
usersRoute.get('/showAll', usersController.showAllController);

// UPDATE ONE:
usersRoute.put('/update', (_req: Request, res: Response) => {
	res.json({
		message: 'User ID is required ...',
	});
});

usersRoute.put(
	'/update/:id',
	userParamsValidationRules,
	validateRequest,
	usersController.updateController
);

// DELETE ONE:
usersRoute.delete('/delete', (_req: Request, res: Response) => {
	res.json({
		message: 'User ID is required ...',
	});
});

usersRoute.delete(
	'/delete/:id',
	userParamsValidationRules,
	validateRequest,
	usersController.deleteController
);

export default usersRoute;
