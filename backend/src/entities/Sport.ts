import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { PlayingGroup } from './PlayingGroup';
import { CoachSport } from './CoachSport';

@Entity('sports')
export class Sport {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name!: string;

  @Column({ type: 'int' })
  team_size!: number;

  @Column({ type: 'int', nullable: true })
  match_duration!: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;

  @OneToMany(() => PlayingGroup, (group) => group.sport)
  playingGroups!: PlayingGroup[];

  @OneToMany(() => CoachSport, (coachSport) => coachSport.sport)
  coachSports!: CoachSport[];
}
