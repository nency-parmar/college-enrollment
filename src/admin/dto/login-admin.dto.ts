import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAdminDto {
    @ApiProperty({ description: 'Admin email address' })
    @IsEmail()
    email!: string;

    @ApiProperty({ description: 'Admin password' })
    @IsNotEmpty()
    @IsString()
    password!: string;
}