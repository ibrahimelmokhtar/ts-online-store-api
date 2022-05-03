import { Request, Response, Router } from 'express';

// create Express Router:
const ordersRoute: Router = Router();

// sample GET method from orders route:
ordersRoute.get('/orders', (_req: Request, res: Response): void => {
	res.send('inside << orders >> route');
});

export default ordersRoute;
