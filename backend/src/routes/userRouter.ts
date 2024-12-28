import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';

export const userRouter = Router();

userRouter.get('/', async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  res.json(users);
});

userRouter.post('/', async (req: Request, res: Response): Promise<any> => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const userRepository = AppDataSource.getRepository(User);
  // Hash the password before saving
  const saltRounds = 10;
  try {
    const password_hash = await bcrypt.hash(password, saltRounds);

    const user = userRepository.create({
      name,
      email,
      password_hash,
      role
    });

    const savedUser = await userRepository.save(user);
    res.status(201).json(savedUser);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});
