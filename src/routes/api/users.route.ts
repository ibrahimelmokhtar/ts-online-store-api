import { Request, Response, Router } from "express";

// create Express Router:
const usersRoute: Router = Router();

// sample GET method from users route:
usersRoute.get('/users', (_req: Request, res: Response): void => {
    res.send(`inside << users >> route`);
});

export default usersRoute;
