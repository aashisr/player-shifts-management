import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Sport } from './Sport';
import { User } from './User';
import { PlayerGroup } from './PlayerGroup';
import { Shift } from './Shift';

@Entity('playing_groups')
export class PlayingGroup {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @ManyToOne(() => Sport, (sport) => sport.playingGroups, { onDelete: 'CASCADE' })
    sport!: Sport;

    @ManyToOne(() => User, (user) => user.playingGroups, { onDelete: 'CASCADE' })
    coach!: User;

    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at!: Date;

    @OneToMany(() => PlayerGroup, (playerGroup) => playerGroup.group)
    playerGroups!: PlayerGroup[];

    @OneToMany(() => Shift, (shift) => shift.group)
    shifts!: Shift[];
}
