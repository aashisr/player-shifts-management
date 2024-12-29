import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { PlayingGroup } from '../entities/PlayingGroup';
import { Sport } from '../entities/Sport';
import { User } from '../entities/User';

export const getAllPlayingGroups = async (req: Request, res: Response): Promise<Response> => {
  try {
    const playingGroupRepository = AppDataSource.getRepository(PlayingGroup);
    const playingGroups = await playingGroupRepository.find({ relations: ['sport', 'coach'] });
    return res.json(playingGroups);
  } catch (error) {
    console.error('Error fetching playing groups:', error);
    return res.status(500).json({ message: 'Failed to fetch playing groups' });
  }
};

export const createPlayingGroup = async (req: Request, res: Response): Promise<Response> => {
  const { name, sportId, coachId } = req.body;

  try {
    const playingGroupRepository = AppDataSource.getRepository(PlayingGroup);
    const sportRepository = AppDataSource.getRepository(Sport);
    const userRepository = AppDataSource.getRepository(User);

    // Check if the sport exists
    const sport = await sportRepository.findOne({ where: { id: sportId } });
    if (!sport) {
      return res.status(404).json({ message: 'Sport not found' });
    }

    // Check if the coach exists and has the role 'coach'
    const coach = await userRepository.findOne({ where: { id: coachId, role: 'coach' } });
    if (!coach) {
      return res.status(404).json({ message: 'Coach not found or not a coach' });
    }

    // Create and save the new playing group
    const playingGroup = playingGroupRepository.create({ name, sport, coach });
    await playingGroupRepository.save(playingGroup);
    return res.status(201).json(playingGroup);
  } catch (error) {
    console.error('Error creating playing group:', error);
    return res.status(500).json({ message: 'Failed to create playing group' });
  }
};
