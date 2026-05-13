import { Injectable, NotFoundException } from '@nestjs/common';
import { BillStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBillDto, UpdateBillDto } from './dto/bill.dto';

@Injectable()
export class BillingService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, userId: string, dto: CreateBillDto) {
    const totalAmount = dto.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice, 0,
    );
    const discount = dto.discount ?? 0;
    const netAmount = totalAmount - discount;

    // Generate bill number
    const count = await this.prisma.bill.count({ where: { tenantId } });
    const billNo = `BILL-${String(count + 1).padStart(5, '0')}`;

    const bill = await this.prisma.bill.create({
      data: {
        tenantId,
        patientId: dto.patientId,
        billNo,
        totalAmount: netAmount,
        discount,
        paymentMode: dto.paymentMode,
        notes: dto.notes,
        status: BillStatus.PENDING,
        createdBy: userId,
        items: {
          create: dto.items.map((item) => ({
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: item.quantity * item.unitPrice,
          })),
        },
      },
      include: { patient: true, items: true },
    });

    return bill;
  }

  async findAll(tenantId: string, patientId?: string) {
    const where: any = { tenantId, deletedAt: null };
    if (patientId) where.patientId = patientId;

    return this.prisma.bill.findMany({
      where,
      include: { patient: true, items: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(tenantId: string, id: string) {
    const bill = await this.prisma.bill.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { patient: true, items: true },
    });
    if (!bill) throw new NotFoundException('Bill not found');
    return bill;
  }

  async recordPayment(tenantId: string, id: string, dto: UpdateBillDto) {
    const bill = await this.findOne(tenantId, id);
    const newPaid = (bill.paidAmount ?? 0) + (dto.paidAmount ?? 0);
    const status: BillStatus =
      newPaid >= bill.totalAmount ? BillStatus.PAID
      : newPaid > 0 ? BillStatus.PARTIAL
      : BillStatus.PENDING;

    return this.prisma.bill.update({
      where: { id },
      data: {
        paidAmount: newPaid,
        paymentMode: dto.paymentMode ?? bill.paymentMode,
        status,
      },
      include: { patient: true, items: true },
    });
  }

  async getDashboardStats(tenantId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalBills, todayBills, pendingBills] = await this.prisma.$transaction([
      this.prisma.bill.aggregate({
        where: { tenantId, deletedAt: null },
        _sum: { totalAmount: true, paidAmount: true },
        _count: true,
      }),
      this.prisma.bill.aggregate({
        where: { tenantId, deletedAt: null, createdAt: { gte: today } },
        _sum: { paidAmount: true },
        _count: true,
      }),
      this.prisma.bill.count({
        where: { tenantId, deletedAt: null, status: { in: ['PENDING', 'PARTIAL'] } },
      }),
    ]);

    return {
      totalRevenue: totalBills._sum.totalAmount ?? 0,
      totalCollected: totalBills._sum.paidAmount ?? 0,
      totalBills: totalBills._count,
      todayRevenue: todayBills._sum.paidAmount ?? 0,
      todayBills: todayBills._count,
      pendingBills,
    };
  }
}
