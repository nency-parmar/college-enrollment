import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateCourseDto {
    @ApiProperty({ description: 'Course title', maxLength: 150 })
    @IsNotEmpty()
    @IsString()
    @MaxLength(150)
    title!: string;

    @ApiPropertyOptional({ description: 'Optional description for the course' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ description: 'Maximum number of students allowed in the course', minimum: 1 })
    @IsInt()
    @Min(1)
    maxCapacity!: number;
}