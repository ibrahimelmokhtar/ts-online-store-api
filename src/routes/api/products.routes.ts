import { Request, Response, Router } from 'express';

// create Express Router:
const productsRoute: Router = Router();

// sample GET method from products route:
productsRoute.get('/', async (_req: Request, res: Response): Promise<void> => {
	res.json({ message: 'inside << products >> route.' });
});

export default productsRoute;
