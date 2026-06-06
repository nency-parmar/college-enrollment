import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Enrollment } from '../../enrollments/entities/enrollments.entity';

@Entity({ name: 'courses' })
export class Course {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 150 })
    title!: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'int' })
    maxCapacity!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
    enrollments!: Enrollment[];
}