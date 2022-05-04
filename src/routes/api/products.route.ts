import { Request, Response, Router } from 'express';

// create Express Router:
const productsRoute: Router = Router();

// sample GET method from products route:
productsRoute.get(
	'/products',
	async (_req: Request, res: Response): Promise<void> => {
		res.send('inside << products >> route');
	}
);

export default productsRoute;
