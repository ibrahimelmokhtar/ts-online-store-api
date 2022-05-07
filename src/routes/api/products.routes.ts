import { Request, Response, Router } from 'express';
import * as productsController from '../../controllers/products.controller';

// create Express Router:
const productsRoute: Router = Router();

// sample GET method from products route:
productsRoute.get('/', async (_req: Request, res: Response): Promise<void> => {
	res.json({ message: 'inside << products >> route.' });
});

// available routes for CRUD operations within /products route:

// CREATE ONE:
productsRoute.post('/create', productsController.createController);

// READ ONE:
productsRoute.get('/show', (_req: Request, res: Response) => {
	res.json({
		message: 'Product ID is required ...',
	});
});

productsRoute.get('/show/:id', productsController.showController);

// READ ALL:
productsRoute.get('/showAll', productsController.showAllController);

// UPDATE ONE:
productsRoute.put('/update', (_req: Request, res: Response) => {
	res.json({
		message: 'Product ID is required ...',
	});
});

productsRoute.put('/update/:id', productsController.updateController);

// DELETE ONE:
productsRoute.delete('/delete', (_req: Request, res: Response) => {
	res.json({
		message: 'Product ID is required ...',
	});
});

productsRoute.delete('/delete/:id', productsController.deleteController);

export default productsRoute;
