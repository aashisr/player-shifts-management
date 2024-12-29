import { Router, Request, Response } from 'express';
import { getAllShifts, createShift } from '../controllers/shiftController';

export const shiftRouter = Router();

shiftRouter.get('/', async (req: Request, res: Response) => {
	await getAllShifts(req, res);
});
shiftRouter.post('/', async (req: Request, res: Response) => {
	await createShift(req, res);
});
