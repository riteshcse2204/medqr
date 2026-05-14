import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLabOrderDto, UpdateLabResultsDto } from './dto/lab.dto';

@Injectable()
export class LabService {
  constructor(private prisma: PrismaService) {}

  async createOrder(tenantId: string, userId: string, dto: CreateLabOrderDto) {
    return this.prisma.labOrder.create({
      data: {
        ...dto,
        tenantId,
        createdBy: userId,
      },
    });
  }

  async getOrders(tenantId: string, patientId?: string) {
    return this.prisma.labOrder.findMany({
      where: {
        tenantId,
        ...(patientId && { patientId }),
        deletedAt: null,
      },
      include: {
        patient: true,
        doctor: true,
        results: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateResults(tenantId: string, orderId: string, dto: UpdateLabResultsDto) {
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.labOrder.findUnique({
        where: { id: orderId },
      });

      if (!order || order.tenantId !== tenantId) {
        throw new NotFoundException('Lab order not found');
      }

      // Delete existing results if any (re-upload pattern)
      await tx.labResult.deleteMany({
        where: { orderId },
      });

      // Create new results
      const updatedOrder = await tx.labOrder.update({
        where: { id: orderId },
        data: {
          status: dto.status,
          results: {
            create: dto.results.map((r) => ({
              parameter: r.parameter,
              value: r.value,
              unit: r.unit,
              referenceRange: r.referenceRange,
              isAbnormal: r.isAbnormal || false,
              notes: r.notes,
            })),
          },
        },
        include: {
          results: true,
        },
      });

      return updatedOrder;
    });
  }
}
