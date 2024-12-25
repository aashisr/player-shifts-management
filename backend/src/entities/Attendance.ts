import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Shift } from './Shift';
import { User } from './User';

@Entity('attendance')
export class Attendance {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Shift, (shift) => shift.attendances, { onDelete: 'CASCADE' })
    shift!: Shift;

    @ManyToOne(() => User, (user) => user.attendances, { onDelete: 'CASCADE' })
    player!: User;

    @Column({ type: 'enum', enum: ['present', 'absent'], default: 'absent' })
    status!: 'present' | 'absent';

    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;
}
