import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Buffer } from 'buffer';
import { AdminService } from './admin.service';

@Injectable()
export class BasicAuthGuard implements CanActivate {
    constructor(private readonly adminService: AdminService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const header = request.headers.authorization;
        if (!header || !header.startsWith('Basic ')) {
            throw new UnauthorizedException('Authorization header is required');
        }

        const encoded = header.slice(6);
        let decoded: string;
        try {
            decoded = Buffer.from(encoded, 'base64').toString('utf8');
        } catch {
            throw new UnauthorizedException('Invalid authorization token');
        }

        const [email, password] = decoded.split(':');
        if (!email || !password) {
            throw new UnauthorizedException('Authorization value must be email:password');
        }

        const admin = await this.adminService.validateAdmin(email, password);
        if (!admin) {
            throw new UnauthorizedException('Invalid admin credentials');
        }

        request['admin'] = { id: admin.id, email: admin.email, name: admin.name };
        return true;
    }
}
