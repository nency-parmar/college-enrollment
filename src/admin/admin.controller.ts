import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBasicAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { BasicAuthGuard } from './basic-auth.guard';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Post('register')
    @ApiOperation({ summary: 'Register a new admin user' })
    @ApiResponse({ status: 201, description: 'Admin created successfully' })
    async register(@Body() createAdminDto: CreateAdminDto) {
        return this.adminService.create(createAdminDto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Validate admin credentials' })
    @ApiResponse({ status: 200, description: 'Admin authenticated successfully' })
    async login(@Body() loginAdminDto: LoginAdminDto) {
        return this.adminService.login(loginAdminDto);
    }

    @UseGuards(BasicAuthGuard)
    @ApiBasicAuth('basic')
    @Get()
    @ApiOperation({ summary: 'List all admin users' })
    @ApiResponse({ status: 200, description: 'Returns admin list' })
    async findAll() {
        return this.adminService.findAll();
    }
}
