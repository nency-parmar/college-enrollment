import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/courses.entity';
import { CreateCourseDto } from './dto/courses.dto';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly coursesRepository: Repository<Course>,
    ) { }

    async create(createCourseDto: CreateCourseDto): Promise<Course> {
        const course = this.coursesRepository.create(createCourseDto);
        return this.coursesRepository.save(course);
    }

    async findAll(): Promise<Course[]> {
        return this.coursesRepository.find({ relations: { enrollments: true } });
    }

    async findOne(id: number): Promise<Course> {
        const course = await this.coursesRepository.findOne({ where: { id }, relations: { enrollments: true } });
        if (!course) {
            throw new NotFoundException('Course not found');
        }
        return course;
    }
}
