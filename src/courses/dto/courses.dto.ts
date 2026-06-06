import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateCourseDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(150)
    title!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsInt()
    @Min(1)
    maxCapacity!: number;
}