import { Module } from '@nestjs/common';
import { ClinicalService } from './clinical.service';
import { ClinicalController } from './clinical.controller';
import { TelemedicineService } from './telemedicine.service';
import { TelemedicineController } from './telemedicine.controller';
import { GovtService } from './govt.service';

@Module({
  providers: [ClinicalService, TelemedicineService, GovtService],
  controllers: [ClinicalController, TelemedicineController],
})
export class ClinicalModule {}
