import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Sport } from './Sport';
import { User } from './User';

@Entity('coach_sports')
export class CoachSport {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @ManyToOne(() => Sport, (sport) => sport.coachSports, { onDelete: 'CASCADE' })
  sport!: Sport;

  @ManyToOne(() => User, (user) => user.coachSports, { onDelete: 'CASCADE' })
  coach!: User;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
}
