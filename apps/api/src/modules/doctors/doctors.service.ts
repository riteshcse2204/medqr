import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDoctorDto, UpdateDoctorDto } from './dto/doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, dto: CreateDoctorDto) {
    return this.prisma.doctor.create({ data: { ...dto, tenantId } });
  }

  async findAll(tenantId: string) {
    return this.prisma.doctor.findMany({
      where: { tenantId, deletedAt: null, isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(tenantId: string, id: string) {
    const doctor = await this.prisma.doctor.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: {
        appointments: {
          where: { deletedAt: null, date: { gte: new Date() } },
          include: { patient: true },
          orderBy: { date: 'asc' },
          take: 20,
        },
      },
    });
    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }

  async update(tenantId: string, id: string, dto: UpdateDoctorDto) {
    await this.findOne(tenantId, id);
    return this.prisma.doctor.update({ where: { id }, data: dto });
  }

  async remove(tenantId: string, id: string) {
    await this.findOne(tenantId, id);
    return this.prisma.doctor.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false },
    });
  }
}
