import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    Unique,
} from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { Course } from '../../courses/entities/courses.entity';

@Entity({ name: 'enrollments' })
@Unique(['student', 'course'])
export class Enrollment {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Student, (student) => student.enrollments, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'studentId' })
    student!: Student;

    @ManyToOne(() => Course, (course) => course.enrollments, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'courseId' })
    course!: Course;

    @CreateDateColumn()
    createdAt!: Date;
}