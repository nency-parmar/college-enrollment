import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateStudentDto {
    @ApiProperty({ description: 'Student full name', minLength: 2, maxLength: 50 })
    @IsNotEmpty()
    @IsString()
    @Length(2, 50)
    name!: string;

    @ApiProperty({ description: 'Student email address' })
    @IsEmail()
    email!: string;

    @ApiProperty({ description: 'Student phone number', minLength: 10, maxLength: 15 })
    @IsNotEmpty()
    @IsString()
    @Length(10, 15)
    phone!: string;
}