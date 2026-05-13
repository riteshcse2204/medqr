import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { TenantId } from '../../common/decorators/tenant.decorator';
import { PatientsService } from './patients.service';
import { CreatePatientDto, UpdatePatientDto, PatientQueryDto } from './dto/patient.dto';

@ApiTags('Patients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiOperation({ summary: 'Register a new patient' })
  create(
    @TenantId() tenantId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: CreatePatientDto,
  ) {
    return this.patientsService.create(tenantId, userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all patients with search & pagination' })
  findAll(@TenantId() tenantId: string, @Query() query: PatientQueryDto) {
    return this.patientsService.findAll(tenantId, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single patient with appointments & bills' })
  findOne(@TenantId() tenantId: string, @Param('id') id: string) {
    return this.patientsService.findOne(tenantId, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update patient details' })
  update(
    @TenantId() tenantId: string,
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body() dto: UpdatePatientDto,
  ) {
    return this.patientsService.update(tenantId, id, userId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft-delete a patient' })
  remove(@TenantId() tenantId: string, @Param('id') id: string) {
    return this.patientsService.remove(tenantId, id);
  }
}
