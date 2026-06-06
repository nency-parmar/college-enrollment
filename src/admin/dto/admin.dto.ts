import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAdminDto {
    @ApiProperty({ description: 'Full name of the admin', minLength: 2, maxLength: 100 })
    @IsNotEmpty()
    @IsString()
    @Length(2, 100)
    name!: string;

    @ApiProperty({ description: 'Admin email address' })
    @IsEmail()
    email!: string;

    @ApiProperty({ description: 'Password for admin login', minLength: 6, maxLength: 20 })
    @IsNotEmpty()
    @IsString()
    @Length(6, 20)
    password!: string;
}