import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { PlayerShift } from '../entities/PlayerShift';
import { User } from '../entities/User';
import { Shift } from '../entities/Shift';

export const enrollPlayerInShift = async (req: Request, res: Response): Promise<Response> => {
  const { playerId, shiftId } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(User);
    const shiftRepository = AppDataSource.getRepository(Shift);
    const playerShiftRepository = AppDataSource.getRepository(PlayerShift);

    // Check if the player exists and has the role 'player'
    const player = await userRepository.findOne({ where: { id: playerId, role: 'player' } });
    if (!player) {
      return res.status(404).json({ message: 'Player not found or not a player' });
    }

    // Check if the shift exists
    const shift = await shiftRepository.findOne({ where: { id: shiftId } });
    if (!shift) {
      return res.status(404).json({ message: 'Shift not found' });
    }

    // Create and save the PlayerShift entity
    const playerShift = playerShiftRepository.create({ player, shift });
    await playerShiftRepository.save(playerShift);
    return res.status(201).json(playerShift);
  } catch (error) {
    console.error('Error enrolling player in shift:', error);
    return res.status(500).json({ message: 'Failed to enroll player in shift' });
  }
};
