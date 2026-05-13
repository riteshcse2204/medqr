import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { TenantId } from '../../common/decorators/tenant.decorator';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto, UpdateAppointmentDto, AppointmentQueryDto } from './dto/appointment.dto';

@ApiTags('Appointments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Book a new appointment' })
  create(
    @TenantId() tenantId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: CreateAppointmentDto,
  ) {
    return this.appointmentsService.create(tenantId, userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List appointments with filters (date, doctor, status)' })
  findAll(@TenantId() tenantId: string, @Query() query: AppointmentQueryDto) {
    return this.appointmentsService.findAll(tenantId, query);
  }

  @Get('queue/today')
  @ApiOperation({ summary: "Get today's OPD queue" })
  getTodayQueue(@TenantId() tenantId: string, @Query('doctorId') doctorId?: string) {
    return this.appointmentsService.getTodayQueue(tenantId, doctorId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single appointment' })
  findOne(@TenantId() tenantId: string, @Param('id') id: string) {
    return this.appointmentsService.findOne(tenantId, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update appointment status or notes' })
  update(
    @TenantId() tenantId: string,
    @Param('id') id: string,
    @Body() dto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(tenantId, id, dto);
  }
}
