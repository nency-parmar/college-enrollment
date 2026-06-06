import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';
import { BasicAuthGuard } from './basic-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [AdminController],
  providers: [AdminService, BasicAuthGuard],
  exports: [BasicAuthGuard, AdminService],
})
export class AdminModule { }
