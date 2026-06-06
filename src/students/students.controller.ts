import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/students.dto';
import { Student } from './entities/student.entity';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) { }

    @Post()
    async create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
        return this.studentsService.create(createStudentDto);
    }

    @Get()
    async findAll(): Promise<Student[]> {
        return this.studentsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Student | null> {
        return this.studentsService.findOne(id);
    }
}