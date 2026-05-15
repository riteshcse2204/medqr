import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HrService } from './hr.service';

@Module({
  providers: [UsersService, HrService],
  controllers: [UsersController],
})
export class UsersModule {}
