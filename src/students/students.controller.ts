import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/students.dto';
import { Student } from './entities/student.entity';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new student profile' })
    @ApiResponse({ status: 201, description: 'Student profile created successfully' })
    async create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
        return this.studentsService.create(createStudentDto);
    }

    @Get()
    @ApiOperation({ summary: 'List all students' })
    @ApiResponse({ status: 200, description: 'Returns registered students' })
    async findAll(): Promise<Student[]> {
        return this.studentsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a student by ID' })
    @ApiResponse({ status: 200, description: 'Returns student detail' })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Student | null> {
        return this.studentsService.findOne(id);
    }
}