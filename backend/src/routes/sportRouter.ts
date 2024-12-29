import { Router, Request, Response } from 'express';
import { getAllSports, createSport } from '../controllers/sportController';

export const sportRouter = Router();

sportRouter.get('/', async (req: Request, res: Response) => {
  await getAllSports(req, res);
});

sportRouter.post('/', async (req: Request, res: Response) => {
  await createSport(req, res);
});
