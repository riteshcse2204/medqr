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
import { LabService } from './lab.service';
import { CreateLabOrderDto, UpdateLabResultsDto } from './dto/lab.dto';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('lab')
@ApiBearerAuth()
@Controller('lab')
export class LabController {
  constructor(private readonly labService: LabService) {}

  @Post('orders')
  @Roles(Role.DOCTOR, Role.HOSPITAL_ADMIN)
  @ApiOperation({ summary: 'Create a new lab order' })
  createOrder(
    @Tenant() tenantId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: CreateLabOrderDto,
  ) {
    return this.labService.createOrder(tenantId, userId, dto);
  }

  @Get('orders')
  @ApiOperation({ summary: 'Get all lab orders, optionally filtered by patient' })
  getOrders(@Tenant() tenantId: string, @Query('patientId') patientId?: string) {
    return this.labService.getOrders(tenantId, patientId);
  }

  @Patch('orders/:id/results')
  @Roles(Role.LAB_TECH, Role.HOSPITAL_ADMIN)
  @ApiOperation({ summary: 'Update lab results for an order' })
  updateResults(
    @Tenant() tenantId: string,
    @Param('id') id: string,
    @Body() dto: UpdateLabResultsDto,
  ) {
    return this.labService.updateResults(tenantId, id, dto);
  }
}
