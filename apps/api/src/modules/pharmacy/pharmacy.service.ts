import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMedicineDto, UpdateStockDto } from './dto/pharmacy.dto';

@Injectable()
export class PharmacyService {
  constructor(private prisma: PrismaService) {}

  async createMedicine(tenantId: string, userId: string, dto: CreateMedicineDto) {
    return this.prisma.medicine.create({
      data: {
        ...dto,
        tenantId,
        createdBy: userId,
      },
    });
  }

  async getMedicines(tenantId: string, search?: string) {
    return this.prisma.medicine.findMany({
      where: {
        tenantId,
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { genericName: { contains: search, mode: 'insensitive' } },
          ],
        }),
        deletedAt: null,
      },
      orderBy: { name: 'asc' },
    });
  }

  async updateStock(tenantId: string, medicineId: string, dto: UpdateStockDto) {
    const medicine = await this.prisma.medicine.findUnique({
      where: { id: medicineId },
    });

    if (!medicine || medicine.tenantId !== tenantId) {
      throw new NotFoundException('Medicine not found');
    }

    let newStock = medicine.stock;
    if (dto.type === 'ADD') {
      newStock += dto.quantity;
    } else if (dto.type === 'REMOVE') {
      if (medicine.stock < dto.quantity) {
        throw new BadRequestException('Insufficient stock');
      }
      newStock -= dto.quantity;
    } else if (dto.type === 'SET') {
      newStock = dto.quantity;
    }

    return this.prisma.medicine.update({
      where: { id: medicineId },
      data: { stock: newStock },
    });
  }

  async getStockAlerts(tenantId: string) {
    return this.prisma.medicine.findMany({
      where: {
        tenantId,
        stock: {
          lte: this.prisma.medicine.fields.minStock,
        },
        isActive: true,
        deletedAt: null,
      },
    });
  }
}
