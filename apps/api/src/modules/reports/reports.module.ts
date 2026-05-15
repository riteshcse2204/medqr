import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { AiService } from './ai.service';

@Module({
  providers: [ReportsService, AiService],
  controllers: [ReportsController],
  exports: [ReportsService, AiService],
})
export class ReportsModule {}
