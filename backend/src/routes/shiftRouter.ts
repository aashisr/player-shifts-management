import { Router } from 'express';
import { getAllShifts } from '../controllers/shiftController';

export const shiftRouter = Router();

shiftRouter.get('/', getAllShifts);
