import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { TenantId } from '../../common/decorators/tenant.decorator';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto, UpdateDoctorDto } from './dto/doctor.dto';

@ApiTags('Doctors')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new doctor' })
  create(@TenantId() tenantId: string, @Body() dto: CreateDoctorDto) {
    return this.doctorsService.create(tenantId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all active doctors' })
  findAll(@TenantId() tenantId: string) {
    return this.doctorsService.findAll(tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get doctor with upcoming appointments' })
  findOne(@TenantId() tenantId: string, @Param('id') id: string) {
    return this.doctorsService.findOne(tenantId, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update doctor profile' })
  update(@TenantId() tenantId: string, @Param('id') id: string, @Body() dto: UpdateDoctorDto) {
    return this.doctorsService.update(tenantId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deactivate doctor' })
  remove(@TenantId() tenantId: string, @Param('id') id: string) {
    return this.doctorsService.remove(tenantId, id);
  }
}
