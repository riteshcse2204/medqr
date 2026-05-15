import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AttendanceStatus, PayrollStatus } from '../../generated/client';

@Injectable()
export class HrService {
  constructor(private prisma: PrismaService) {}

  async createStaffProfile(userId: string, data: any) {
    return this.prisma.staffProfile.create({
      data: {
        userId,
        designation: data.designation,
        department: data.department,
        salary: data.salary,
        bankAccount: data.bankAccount,
        panNumber: data.panNumber,
      },
    });
  }

  async recordAttendance(staffProfileId: string, status: AttendanceStatus) {
    return this.prisma.attendance.create({
      data: {
        staffProfileId,
        status,
        checkIn: status === AttendanceStatus.PRESENT ? new Date() : null,
      },
    });
  }

  async generateMonthlyPayroll(tenantId: string, month: number, year: number) {
    const staff = await this.prisma.staffProfile.findMany({
      where: { user: { tenantId } },
    });

    const payrolls: any[] = [];
    for (const member of staff) {
      const payroll = await this.prisma.payroll.create({
        data: {
          staffProfileId: member.id,
          month,
          year,
          basicSalary: member.salary,
          netSalary: member.salary, // Simple logic for now
          status: PayrollStatus.PENDING,
        },
      });
      payrolls.push(payroll);
    }

    return payrolls;
  }

  async getStaffDetails(tenantId: string) {
    return this.prisma.staffProfile.findMany({
      where: { user: { tenantId } },
      include: { user: true, attendance: { take: 5, orderBy: { date: 'desc' } } },
    });
  }
}
