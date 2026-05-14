import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEncounterDto, CreatePrescriptionDto } from './dto/clinical.dto';

@Injectable()
export class ClinicalService {
  constructor(private prisma: PrismaService) {}

  async createEncounter(tenantId: string, userId: string, dto: CreateEncounterDto) {
    return this.prisma.$transaction(async (tx) => {
      const encounter = await tx.encounter.create({
        data: {
          tenantId,
          patientId: dto.patientId,
          doctorId: dto.doctorId,
          appointmentId: dto.appointmentId,
          type: dto.type,
          vitals: dto.vitals,
          diagnosis: dto.diagnosis,
          notes: dto.notes,
          createdBy: userId,
        },
      });

      if (dto.prescriptions && dto.prescriptions.length > 0) {
        await tx.prescription.create({
          data: {
            tenantId,
            patientId: dto.patientId,
            doctorId: dto.doctorId,
            encounterId: encounter.id,
            createdBy: userId,
            items: {
              create: dto.prescriptions.map((item) => ({
                medicineId: item.medicineId,
                medicineName: item.medicineName,
                dosage: item.dosage,
                frequency: item.frequency,
                duration: item.duration,
                instructions: item.instructions,
              })),
            },
          },
        });
      }

      // If there's an appointment, mark it as completed
      if (dto.appointmentId) {
        await tx.appointment.update({
          where: { id: dto.appointmentId },
          data: { status: 'COMPLETED' },
        });
      }

      return encounter;
    });
  }

  async getEncounters(tenantId: string, patientId?: string) {
    return this.prisma.encounter.findMany({
      where: {
        tenantId,
        ...(patientId && { patientId }),
        deletedAt: null,
      },
      include: {
        doctor: true,
        patient: true,
        prescriptions: {
          include: {
            items: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createPrescription(tenantId: string, userId: string, dto: CreatePrescriptionDto) {
    return this.prisma.prescription.create({
      data: {
        tenantId,
        patientId: dto.patientId,
        doctorId: dto.doctorId,
        encounterId: dto.encounterId,
        notes: dto.notes,
        createdBy: userId,
        items: {
          create: dto.items.map((item) => ({
            medicineId: item.medicineId,
            medicineName: item.medicineName,
            dosage: item.dosage,
            frequency: item.frequency,
            duration: item.duration,
            instructions: item.instructions,
          })),
        },
      },
      include: {
        items: true,
      },
    });
  }

  async getPrescriptions(tenantId: string, patientId?: string) {
    return this.prisma.prescription.findMany({
      where: {
        tenantId,
        ...(patientId && { patientId }),
        deletedAt: null,
      },
      include: {
        doctor: true,
        patient: true,
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
