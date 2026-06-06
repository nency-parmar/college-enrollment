import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createHash } from 'crypto';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>,
    ) { }

    async create(createAdminDto: CreateAdminDto): Promise<Omit<Admin, 'password'>> {
        const existing = await this.adminRepository.findOne({ where: { email: createAdminDto.email } });
        if (existing) {
            throw new BadRequestException('Admin with this email already exists');
        }

        const admin = this.adminRepository.create({
            name: createAdminDto.name,
            email: createAdminDto.email,
            password: this.hashPassword(createAdminDto.password),
        });

        const saved = await this.adminRepository.save(admin);
        const { password, ...result } = saved;
        return result;
    }

    async login(loginAdminDto: LoginAdminDto): Promise<Omit<Admin, 'password'>> {
        const admin = await this.adminRepository.findOne({ where: { email: loginAdminDto.email } });
        if (!admin || admin.password !== this.hashPassword(loginAdminDto.password)) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const { password, ...result } = admin;
        return result;
    }

    async validateAdmin(email: string, password: string): Promise<Admin | null> {
        const admin = await this.adminRepository.findOne({ where: { email } });
        if (!admin || admin.password !== this.hashPassword(password)) {
            return null;
        }
        return admin;
    }

    async findAll(): Promise<Partial<Admin>[]> {
        return this.adminRepository.find({ select: { id: true, name: true, email: true, createdAt: true } });
    }

    private hashPassword(password: string): string {
        return createHash('sha256').update(password).digest('hex');
    }
}
