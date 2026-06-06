import { Controller, Post, Body, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBasicAuth } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/courses.dto';
import { BasicAuthGuard } from '../admin/basic-auth.guard';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) { }

    @UseGuards(BasicAuthGuard)
    @ApiBasicAuth('basic')
    @Post()
    @ApiOperation({ summary: 'Create a new course' })
    @ApiResponse({ status: 201, description: 'Course created successfully' })
    async create(@Body() createCourseDto: CreateCourseDto) {
        return this.coursesService.create(createCourseDto);
    }

    @Get()
    @ApiOperation({ summary: 'List all available courses' })
    @ApiResponse({ status: 200, description: 'Returns list of courses' })
    async findAll() {
        return this.coursesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a course by ID' })
    @ApiResponse({ status: 200, description: 'Returns one course' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.coursesService.findOne(id);
    }
}
