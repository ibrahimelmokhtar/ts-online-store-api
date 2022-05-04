import { Request, Response, Router } from 'express';

// create Express Router:
const usersRoute: Router = Router();

// sample GET method from users route:
usersRoute.get(
	'/users',
	async (_req: Request, res: Response): Promise<void> => {
		res.send('inside << users >> route');
	}
);

export default usersRoute;
