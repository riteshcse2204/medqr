import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TelemedicineStatus } from '../../generated/client';

@Injectable()
export class TelemedicineService {
  constructor(private prisma: PrismaService) {}

  async createSession(appointmentId: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { teleSession: true },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    if (appointment.type !== 'TELECONSULT') {
      throw new BadRequestException('Appointment is not a teleconsultation type');
    }

    if (appointment.teleSession) {
      return appointment.teleSession;
    }

    // Generate a unique meeting link (e.g., Jitsi)
    const meetingLink = `https://meet.jit.si/medqr-${appointmentId}`;

    return this.prisma.telemedicineSession.create({
      data: {
        appointmentId,
        meetingLink,
        status: TelemedicineStatus.SCHEDULED,
      },
    });
  }

  async getSessionByAppointment(appointmentId: string) {
    const session = await this.prisma.telemedicineSession.findUnique({
      where: { appointmentId },
    });

    if (!session) {
      throw new NotFoundException('Telemedicine session not found');
    }

    return session;
  }

  async startSession(sessionId: string) {
    return this.prisma.telemedicineSession.update({
      where: { id: sessionId },
      data: {
        status: TelemedicineStatus.STARTED,
        startTime: new Date(),
      },
    });
  }

  async completeSession(sessionId: string) {
    return this.prisma.telemedicineSession.update({
      where: { id: sessionId },
      data: {
        status: TelemedicineStatus.COMPLETED,
        endTime: new Date(),
      },
    });
  }
}
