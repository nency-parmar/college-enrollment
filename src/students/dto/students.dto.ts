import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateStudentDto {
    @IsNotEmpty()
    @IsString()
    @Length(2, 50)
    name!: string;

    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @Length(10, 15)
    phone!: string;
}