import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { PlayingGroup } from './PlayingGroup';
import { PlayerShift } from './PlayerShift';

@Entity('shifts')
export class Shift {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => PlayingGroup, (group) => group.shifts, { onDelete: 'CASCADE' })
  group!: PlayingGroup;

  @Column({ type: 'datetime' })
  start_time!: Date;

  @Column({ type: 'datetime' })
  end_time!: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  court!: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;

  @OneToMany(() => PlayerShift, (playerShift) => playerShift.shift)
  playerShifts!: PlayerShift[];
}
