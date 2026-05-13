import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePatientDto, PatientQueryDto, UpdatePatientDto } from './dto/patient.dto';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, userId: string, dto: CreatePatientDto) {
    const patient = await this.prisma.patient.create({
      data: {
        ...dto,
        dob: dto.dob ? new Date(dto.dob) : undefined,
        tenantId,
        createdBy: userId,
      },
    });
    return patient;
  }

  async findAll(tenantId: string, query: PatientQueryDto) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    const skip = (page - 1) * limit;

    const where: any = { tenantId, deletedAt: null };

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { phone: { contains: query.search } },
        { abhaId: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const [patients, total] = await this.prisma.$transaction([
      this.prisma.patient.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
      this.prisma.patient.count({ where }),
    ]);

    return {
      patients,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(tenantId: string, id: string) {
    const patient = await this.prisma.patient.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: {
        appointments: {
          where: { deletedAt: null },
          include: { doctor: true },
          orderBy: { date: 'desc' },
          take: 10,
        },
        bills: {
          where: { deletedAt: null },
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });
    if (!patient) throw new NotFoundException('Patient not found');
    return patient;
  }

  async update(tenantId: string, id: string, userId: string, dto: UpdatePatientDto) {
    await this.findOne(tenantId, id);
    return this.prisma.patient.update({
      where: { id },
      data: {
        ...dto,
        dob: dto.dob ? new Date(dto.dob) : undefined,
        updatedBy: userId,
      },
    });
  }

  async remove(tenantId: string, id: string) {
    await this.findOne(tenantId, id);
    return this.prisma.patient.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
