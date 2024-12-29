import { Router, Request, Response } from 'express';
import { getAllPlayingGroups, createPlayingGroup } from '../controllers/playingGroupController';

export const playingGroupRouter = Router();

playingGroupRouter.get('/', async (req: Request, res: Response) => {
  await getAllPlayingGroups(req, res);
});

playingGroupRouter.post('/', async (req: Request, res: Response) => {
  await createPlayingGroup(req, res);
});
