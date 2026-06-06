import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Enrollment } from '../../enrollments/entities/enrollments.entity';

@Entity({ name: 'students' })
export class Student {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    phone!: string;

    @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
    enrollments!: Enrollment[];
}