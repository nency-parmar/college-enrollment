import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollments.entity';
import { CreateEnrollmentDto } from './dto/enrollments.dto';
import { Student } from '../students/entities/student.entity';
import { Course } from '../courses/entities/courses.entity';

@Injectable()
export class EnrollmentsService {
    constructor(
        @InjectRepository(Enrollment)
        private readonly enrollmentRepository: Repository<Enrollment>,
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
    ) { }

    async create(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment> {
        const student = await this.studentRepository.findOne({ where: { id: createEnrollmentDto.studentId } });
        if (!student) {
            throw new NotFoundException('Student not found');
        }

        const course = await this.courseRepository.findOne({ where: { id: createEnrollmentDto.courseId } });
        if (!course) {
            throw new NotFoundException('Course not found');
        }

        const existing = await this.enrollmentRepository.findOne({
            where: {
                student: { id: createEnrollmentDto.studentId },
                course: { id: createEnrollmentDto.courseId },
            },
        });
        if (existing) {
            throw new BadRequestException('Student is already enrolled in this course');
        }

        const enrolledCount = await this.enrollmentRepository.count({
            where: { course: { id: createEnrollmentDto.courseId } },
        });
        if (enrolledCount >= course.maxCapacity) {
            throw new BadRequestException('Course has reached maximum capacity');
        }

        const enrollment = this.enrollmentRepository.create({ student, course });
        return this.enrollmentRepository.save(enrollment);
    }

    async findAll(): Promise<Enrollment[]> {
        return this.enrollmentRepository.find({ relations: { student: true, course: true } });
    }

    async findOne(id: number): Promise<Enrollment> {
        const enrollment = await this.enrollmentRepository.findOne({ where: { id }, relations: { student: true, course: true } });
        if (!enrollment) {
            throw new NotFoundException('Enrollment not found');
        }
        return enrollment;
    }
}
