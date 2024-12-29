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

export const createShift = async (req: Request, res: Response): Promise<Response> => {
  const { groupId, start_time, end_time, court } = req.body;

  try {
    const shiftRepository = AppDataSource.getRepository(Shift);
    const groupRepository = AppDataSource.getRepository(PlayingGroup);

    // Check if the group exists
    const group = await groupRepository.findOne({ where: { id: groupId } });
    if (!group) {
      return res.status(404).json({ message: 'Playing group not found' });
    }

    // Create and save the new shift
    const shift = shiftRepository.create({ group, start_time, end_time, court });
    await shiftRepository.save(shift);
    return res.status(201).json(shift);
  } catch (error) {
    console.error('Error creating shift:', error);
    return res.status(500).json({ message: 'Failed to create shift' });
  }
};
