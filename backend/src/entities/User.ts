import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PlayingGroup } from './PlayingGroup';
import { CoachSport } from './CoachSport';
import { Attendance } from './Attendance';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 255 })
    password_hash!: string;

    @Column({ type: 'enum', enum: ['admin', 'coach', 'player'] })
    role!: 'admin' | 'coach' | 'player';

    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at!: Date;

    @OneToMany(() => PlayingGroup, (group) => group.coach)
    playingGroups!: PlayingGroup[];

    @OneToMany(() => CoachSport, (coachSport) => coachSport.coach)
    coachSports!: CoachSport[];

    @OneToMany(() => Attendance, (attendance) => attendance.player)
    attendances!: Attendance[];
}
