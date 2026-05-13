import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAppointmentDto, UpdateAppointmentDto, AppointmentQueryDto } from './dto/appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, userId: string, dto: CreateAppointmentDto) {
    // Get count for queue number
    const todayStart = new Date(dto.date);
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(dto.date);
    todayEnd.setHours(23, 59, 59, 999);

    const todayCount = await this.prisma.appointment.count({
      where: {
        tenantId,
        doctorId: dto.doctorId,
        date: { gte: todayStart, lte: todayEnd },
        deletedAt: null,
      },
    });

    return this.prisma.appointment.create({
      data: {
        ...dto,
        date: new Date(dto.date),
        tenantId,
        queueNo: dto.queueNo ?? todayCount + 1,
        tokenNo: `T${String(todayCount + 1).padStart(3, '0')}`,
        createdBy: userId,
      },
      include: { patient: true, doctor: true },
    });
  }

  async findAll(tenantId: string, query: AppointmentQueryDto) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    const skip = (page - 1) * limit;

    const where: any = { tenantId, deletedAt: null };

    if (query.date) {
      const start = new Date(query.date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(query.date);
      end.setHours(23, 59, 59, 999);
      where.date = { gte: start, lte: end };
    }
    if (query.doctorId) where.doctorId = query.doctorId;
    if (query.status) where.status = query.status;

    const [appointments, total] = await this.prisma.$transaction([
      this.prisma.appointment.findMany({
        where,
        skip,
        take: limit,
        include: { patient: true, doctor: true },
        orderBy: [{ queueNo: 'asc' }, { date: 'asc' }],
      }),
      this.prisma.appointment.count({ where }),
    ]);

    return {
      appointments,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(tenantId: string, id: string) {
    const appointment = await this.prisma.appointment.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { patient: true, doctor: true },
    });
    if (!appointment) throw new NotFoundException('Appointment not found');
    return appointment;
  }

  async update(tenantId: string, id: string, dto: UpdateAppointmentDto) {
    await this.findOne(tenantId, id);
    return this.prisma.appointment.update({
      where: { id },
      data: dto,
      include: { patient: true, doctor: true },
    });
  }

  async getTodayQueue(tenantId: string, doctorId?: string) {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const where: any = {
      tenantId,
      deletedAt: null,
      date: { gte: start, lte: end },
    };
    if (doctorId) where.doctorId = doctorId;

    return this.prisma.appointment.findMany({
      where,
      include: { patient: true, doctor: true },
      orderBy: [{ queueNo: 'asc' }],
    });
  }
}
