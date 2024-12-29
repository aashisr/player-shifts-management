import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Sport } from '../entities/Sport';

export const getAllSports = async (req: Request, res: Response): Promise<Response> => {
  try {
    const sportRepository = AppDataSource.getRepository(Sport);
    const sports = await sportRepository.find();
    return res.json(sports);
  } catch (error) {
    console.error('Error fetching sports:', error);
    return res.status(500).json({ message: 'Failed to fetch sports' });
  }
};

export const createSport = async (req: Request, res: Response): Promise<Response> => {
  const { name, team_size, match_duration } = req.body;

  try {
    const sportRepository = AppDataSource.getRepository(Sport);

    // Check if the sport already exists
    const existingSport = await sportRepository.findOne({ where: { name } });
    if (existingSport) {
      return res.status(400).json({ message: 'Sport already exists' });
    }

    // Create and save the new sport
    const sport = sportRepository.create({ name, team_size, match_duration });
    await sportRepository.save(sport);
    return res.status(201).json(sport);
  } catch (error) {
    console.error('Error creating sport:', error);
    return res.status(500).json({ message: 'Failed to create sport' });
  }
};
