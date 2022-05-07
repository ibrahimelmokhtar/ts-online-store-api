import { Request, Response, Router } from 'express';

// create Express Router:
const ordersRoute: Router = Router();

// sample GET method from orders route:
ordersRoute.get('/', async (_req: Request, res: Response): Promise<void> => {
	res.json({ message: 'inside << orders >> route.' });
});

export default ordersRoute;
