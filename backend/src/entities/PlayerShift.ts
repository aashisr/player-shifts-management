import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './User';
import { Shift } from './Shift';

@Entity('player_shifts')
export class PlayerShift {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.playerShifts, { onDelete: 'CASCADE' })
  player!: User;

  @ManyToOne(() => Shift, (shift) => shift.playerShifts, { onDelete: 'CASCADE' })
  shift!: Shift;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;
}
