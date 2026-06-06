import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class CreateEnrollmentDto {
    @ApiProperty({ description: 'ID of the student to enroll', minimum: 1 })
    @IsInt()
    @Min(1)
    studentId!: number;

    @ApiProperty({ description: 'ID of the course to enroll in', minimum: 1 })
    @IsInt()
    @Min(1)
    courseId!: number;
}