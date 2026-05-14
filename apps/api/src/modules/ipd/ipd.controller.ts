import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { IpdService } from './ipd.service';
import {
  CreateWardDto,
  CreateBedDto,
  CreateAdmissionDto,
  DischargeDto,
} from './dto/ipd.dto';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role, AdmissionStatus } from '@prisma/client';

@ApiTags('ipd')
@ApiBearerAuth()
@Controller('ipd')
export class IpdController {
  constructor(private readonly ipdService: IpdService) {}

  @Post('wards')
  @Roles(Role.HOSPITAL_ADMIN)
  @ApiOperation({ summary: 'Create a new ward' })
  createWard(
    @Tenant() tenantId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: CreateWardDto,
  ) {
    return this.ipdService.createWard(tenantId, userId, dto);
  }

  @Get('wards')
  @ApiOperation({ summary: 'Get all wards' })
  getWards(@Tenant() tenantId: string) {
    return this.ipdService.getWards(tenantId);
  }

  @Post('beds')
  @Roles(Role.HOSPITAL_ADMIN)
  @ApiOperation({ summary: 'Create a new bed in a ward' })
  createBed(@Tenant() tenantId: string, @Body() dto: CreateBedDto) {
    return this.ipdService.createBed(tenantId, dto);
  }

  @Get('beds')
  @ApiOperation({ summary: 'Get all beds, optionally filtered by ward' })
  getBeds(@Tenant() tenantId: string, @Query('wardId') wardId?: string) {
    return this.ipdService.getBeds(tenantId, wardId);
  }

  @Post('admissions')
  @Roles(Role.DOCTOR, Role.HOSPITAL_ADMIN, Role.RECEPTIONIST)
  @ApiOperation({ summary: 'Admit a patient to a bed' })
  admitPatient(
    @Tenant() tenantId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: CreateAdmissionDto,
  ) {
    return this.ipdService.admitPatient(tenantId, userId, dto);
  }

  @Patch('admissions/:id/discharge')
  @Roles(Role.DOCTOR, Role.HOSPITAL_ADMIN)
  @ApiOperation({ summary: 'Discharge a patient' })
  dischargePatient(
    @Tenant() tenantId: string,
    @Param('id') id: string,
    @Body() dto: DischargeDto,
  ) {
    return this.ipdService.dischargePatient(tenantId, id, dto);
  }

  @Get('admissions')
  @ApiOperation({ summary: 'Get all admissions, optionally filtered by status' })
  getAdmissions(
    @Tenant() tenantId: string,
    @Query('status') status?: AdmissionStatus,
  ) {
    return this.ipdService.getAdmissions(tenantId, status);
  }
}
