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
import { PharmacyService } from './pharmacy.service';
import { CreateMedicineDto, UpdateStockDto } from './dto/pharmacy.dto';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../prisma/client';

@ApiTags('pharmacy')
@ApiBearerAuth()
@Controller('pharmacy')
export class PharmacyController {
  constructor(private readonly pharmacyService: PharmacyService) {}

  @Post('medicines')
  @Roles(Role.PHARMACIST, Role.HOSPITAL_ADMIN)
  @ApiOperation({ summary: 'Add a new medicine to inventory' })
  createMedicine(
    @Tenant() tenantId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: CreateMedicineDto,
  ) {
    return this.pharmacyService.createMedicine(tenantId, userId, dto);
  }

  @Get('medicines')
  @ApiOperation({ summary: 'Get all medicines, optionally search by name' })
  getMedicines(@Tenant() tenantId: string, @Query('search') search?: string) {
    return this.pharmacyService.getMedicines(tenantId, search);
  }

  @Patch('medicines/:id/stock')
  @Roles(Role.PHARMACIST, Role.HOSPITAL_ADMIN)
  @ApiOperation({ summary: 'Update stock levels for a medicine' })
  updateStock(
    @Tenant() tenantId: string,
    @Param('id') id: string,
    @Body() dto: UpdateStockDto,
  ) {
    return this.pharmacyService.updateStock(tenantId, id, dto);
  }

  @Get('stock-alerts')
  @Roles(Role.PHARMACIST, Role.HOSPITAL_ADMIN)
  @ApiOperation({ summary: 'Get medicines that are low on stock' })
  getStockAlerts(@Tenant() tenantId: string) {
    return this.pharmacyService.getStockAlerts(tenantId);
  }
}
