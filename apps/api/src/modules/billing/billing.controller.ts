import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { TenantId } from '../../common/decorators/tenant.decorator';
import { BillingService } from './billing.service';
import { CreateBillDto, UpdateBillDto } from './dto/bill.dto';

@ApiTags('Billing')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Revenue dashboard stats' })
  getStats(@TenantId() tenantId: string) {
    return this.billingService.getDashboardStats(tenantId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new bill' })
  create(
    @TenantId() tenantId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: CreateBillDto,
  ) {
    return this.billingService.create(tenantId, userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all bills, optionally filter by patient' })
  findAll(@TenantId() tenantId: string, @Query('patientId') patientId?: string) {
    return this.billingService.findAll(tenantId, patientId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single bill with items' })
  findOne(@TenantId() tenantId: string, @Param('id') id: string) {
    return this.billingService.findOne(tenantId, id);
  }

  @Put(':id/payment')
  @ApiOperation({ summary: 'Record payment against a bill' })
  recordPayment(
    @TenantId() tenantId: string,
    @Param('id') id: string,
    @Body() dto: UpdateBillDto,
  ) {
    return this.billingService.recordPayment(tenantId, id, dto);
  }
}
