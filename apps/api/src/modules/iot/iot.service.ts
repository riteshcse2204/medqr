import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DeviceType } from '../../generated/client';

@Injectable()
export class IotService {
  private readonly logger = new Logger(IotService.name);

  constructor(private prisma: PrismaService) {}

  async registerDevice(tenantId: string, data: { name: string, type: DeviceType, macAddress: string, branchId?: string }) {
    return this.prisma.iotDevice.create({
      data: {
        ...data,
        tenantId,
      },
    });
  }

  async recordReading(deviceId: string, patientId: string, value: any) {
    this.logger.log(`Recording reading for Device: ${deviceId}, Patient: ${patientId}`);
    
    return this.prisma.$transaction([
      this.prisma.iotReading.create({
        data: {
          deviceId,
          patientId,
          value,
        },
      }),
      this.prisma.iotDevice.update({
        where: { id: deviceId },
        data: { lastSeen: new Date() },
      }),
    ]);
  }

  async getPatientReadings(patientId: string) {
    return this.prisma.iotReading.findMany({
      where: { patientId },
      include: { device: true },
      orderBy: { timestamp: 'desc' },
    });
  }
}
