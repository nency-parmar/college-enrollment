import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { BasicAuthGuard } from './basic-auth.guard';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Post('register')
    async register(@Body() createAdminDto: CreateAdminDto) {
        return this.adminService.create(createAdminDto);
    }

    @Post('login')
    async login(@Body() loginAdminDto: LoginAdminDto) {
        return this.adminService.login(loginAdminDto);
    }

    @UseGuards(BasicAuthGuard)
    @Get()
    async findAll() {
        return this.adminService.findAll();
    }
}
