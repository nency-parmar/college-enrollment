import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAdminDto {
    @IsNotEmpty()
    @IsString()
    @Length(2, 100)
    name!: string;

    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 20)
    password!: string;
}