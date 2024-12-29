import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Shift } from '../entities/Shift';
import { PlayingGroup } from '../entities/PlayingGroup';

export const getAllShifts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const shiftRepository = AppDataSource.getRepository(Shift);
    const shifts = await shiftRepository.find();
    return res.json(shifts);
  } catch (error) {
    console.error('Error fetching shifts:', error);
    return res.status(500).json({ message: 'Failed to fetch shifts' });
  }
};
  }
};
