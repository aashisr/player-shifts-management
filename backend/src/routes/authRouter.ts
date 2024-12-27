import { Router, Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const authRouter = Router();

authRouter.post('/login', async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email });

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        return res.status(500).json({ message: 'JWT secret is not defined' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, jwtSecret, {
        expiresIn: '1h'
    });

    res.json({ token });
});

authRouter.get('/me', async (req: Request, res: Response): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: 'Authorization header is missing' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    res.status(500).json({ message: 'JWT secret is not defined' });
    return;
  }

  try {
    const decoded: any = jwt.verify(token, jwtSecret);
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: decoded.userId });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});