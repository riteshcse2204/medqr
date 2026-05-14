import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateWardDto,
  CreateBedDto,
  CreateAdmissionDto,
  DischargeDto,
} from './dto/ipd.dto';

@Injectable()
export class IpdService {
  constructor(private prisma: PrismaService) {}

  // Wards
  async createWard(tenantId: string, userId: string, dto: CreateWardDto) {
    return this.prisma.ward.create({
      data: {
        ...dto,
        tenantId,
        createdBy: userId,
      },
    });
  }

  async getWards(tenantId: string) {
    return this.prisma.ward.findMany({
      where: { tenantId, deletedAt: null },
      include: {
        _count: {
          select: { beds: true },
        },
      },
    });
  }

  // Beds
  async createBed(tenantId: string, dto: CreateBedDto) {
    return this.prisma.bed.create({
      data: {
        ...dto,
        tenantId,
      },
    });
  }

  async getBeds(tenantId: string, wardId?: string) {
    return this.prisma.bed.findMany({
      where: {
        tenantId,
        ...(wardId && { wardId }),
      },
      include: {
        ward: true,
        admissions: {
          where: { status: 'ADMITTED' },
          include: { patient: true },
        },
      },
    });
  }

  // Admissions
  async admitPatient(tenantId: string, userId: string, dto: CreateAdmissionDto) {
    return this.prisma.$transaction(async (tx) => {
      // Check if bed is available
      const bed = await tx.bed.findUnique({
        where: { id: dto.bedId },
      });

      if (!bed || bed.status !== 'AVAILABLE') {
        throw new BadRequestException('Bed is not available');
      }

      // Create admission
      const admission = await tx.ipdAdmission.create({
        data: {
          tenantId,
          patientId: dto.patientId,
          doctorId: dto.doctorId,
          bedId: dto.bedId,
          admissionDate: dto.admissionDate ? new Date(dto.admissionDate) : new Date(),
          reason: dto.reason,
          notes: dto.notes,
          createdBy: userId,
        },
      });

      // Update bed status
      await tx.bed.update({
        where: { id: dto.bedId },
        data: { status: 'OCCUPIED' },
      });

      return admission;
    });
  }

  async dischargePatient(tenantId: string, admissionId: string, dto: DischargeDto) {
    return this.prisma.$transaction(async (tx) => {
      const admission = await tx.ipdAdmission.findUnique({
        where: { id: admissionId },
      });

      if (!admission || admission.status !== 'ADMITTED') {
        throw new NotFoundException('Active admission not found');
      }

      // Update admission
      const updatedAdmission = await tx.ipdAdmission.update({
        where: { id: admissionId },
        data: {
          status: 'DISCHARGED',
          dischargeDate: new Date(dto.dischargeDate),
          notes: admission.notes + '\nDischarge Notes: ' + dto.notes,
        },
      });

      // Update bed status
      await tx.bed.update({
        where: { id: admission.bedId },
        data: { status: 'AVAILABLE' },
      });

      return updatedAdmission;
    });
  }

  async getAdmissions(tenantId: string, status?: any) {
    return this.prisma.ipdAdmission.findMany({
      where: {
        tenantId,
        ...(status && { status }),
        deletedAt: null,
      },
      include: {
        patient: true,
        doctor: true,
        bed: {
          include: { ward: true },
        },
      },
      orderBy: { admissionDate: 'desc' },
    });
  }
}
