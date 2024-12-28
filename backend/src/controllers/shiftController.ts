import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Shift } from '../entities/Shift';

export const getAllShifts = async (req: Request, res: Response) => {
  try {
    const shiftRepository = AppDataSource.getRepository(Shift);
    const shifts = await shiftRepository.find();
    res.json(shifts);
  } catch (error) {
    console.error('Error fetching shifts:', error);
    res.status(500).json({ message: 'Failed to fetch shifts' });
  }
};
