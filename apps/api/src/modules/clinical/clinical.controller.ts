import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ClinicalService } from './clinical.service';
import { CreateEncounterDto, CreatePrescriptionDto } from './dto/clinical.dto';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../prisma/client';

@ApiTags('clinical')
@ApiBearerAuth()
@Controller('clinical')
export class ClinicalController {
  constructor(private readonly clinicalService: ClinicalService) {}

  @Post('encounters')
  @Roles(Role.DOCTOR, Role.HOSPITAL_ADMIN)
  @ApiOperation({ summary: 'Create a new clinical encounter (visit)' })
  createEncounter(
    @Tenant() tenantId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: CreateEncounterDto,
  ) {
    return this.clinicalService.createEncounter(tenantId, userId, dto);
  }

  @Get('encounters')
  @ApiOperation({ summary: 'Get all encounters, optionally filtered by patient' })
  getEncounters(
    @Tenant() tenantId: string,
    @Query('patientId') patientId?: string,
  ) {
    return this.clinicalService.getEncounters(tenantId, patientId);
  }

  @Post('prescriptions')
  @Roles(Role.DOCTOR, Role.HOSPITAL_ADMIN)
  @ApiOperation({ summary: 'Create a standalone prescription' })
  createPrescription(
    @Tenant() tenantId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: CreatePrescriptionDto,
  ) {
    return this.clinicalService.createPrescription(tenantId, userId, dto);
  }

  @Get('prescriptions')
  @ApiOperation({ summary: 'Get all prescriptions, optionally filtered by patient' })
  getPrescriptions(
    @Tenant() tenantId: string,
    @Query('patientId') patientId?: string,
  ) {
    return this.clinicalService.getPrescriptions(tenantId, patientId);
  }
}
