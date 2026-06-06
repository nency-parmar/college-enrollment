import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/enrollments.dto';

@ApiTags('Enrollments')
@Controller('enrollments')
export class EnrollmentsController {
    constructor(private readonly enrollmentsService: EnrollmentsService) { }

    @Post()
    @ApiOperation({ summary: 'Enroll a student into a course' })
    @ApiResponse({ status: 201, description: 'Enrollment created successfully' })
    async create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
        return this.enrollmentsService.create(createEnrollmentDto);
    }

    @Get()
    @ApiOperation({ summary: 'List all enrollments' })
    @ApiResponse({ status: 200, description: 'Returns list of enrollments' })
    async findAll() {
        return this.enrollmentsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific enrollment' })
    @ApiResponse({ status: 200, description: 'Returns a single enrollment' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.enrollmentsService.findOne(id);
    }
}
