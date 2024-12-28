import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { PlayingGroup } from './PlayingGroup';

@Entity('players_groups')
export class PlayerGroup {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => PlayingGroup, (group) => group.playerGroups, { onDelete: 'CASCADE' })
  group!: PlayingGroup;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;
}
