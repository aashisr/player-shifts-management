import { Router, Request, Response } from 'express';
import { enrollPlayerInShift } from '../controllers/playerShiftController';

export const playerShiftRouter = Router();

playerShiftRouter.post('/enroll', async (req: Request, res: Response) => {
  await enrollPlayerInShift(req, res);
});
