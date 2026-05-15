import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Predicts if an appointment will be a 'No-Show'
   * Logic: Checks patient's historical attendance and appointment time slots.
   */
  async predictNoShow(appointmentId: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { patient: { include: { appointments: true } } },
    });

    if (!appointment) return { score: 0, prediction: 'UNKNOWN' };

    const patientAppointments = appointment.patient.appointments;
    const totalPrevious = patientAppointments.length;
    const previousNoShows = patientAppointments.filter(a => a.status === 'NO_SHOW').length;

    // Calculate score (0 to 100)
    let score = 10; // Base score
    if (totalPrevious > 0) {
      score += (previousNoShows / totalPrevious) * 60;
    }

    // High risk if appointment is on Monday morning or Saturday evening (simulated logic)
    const day = appointment.date.getDay();
    if (day === 1 || day === 6) score += 20;

    return {
      appointmentId,
      noShowProbability: Math.min(score, 100).toFixed(2) + '%',
      riskLevel: score > 70 ? 'HIGH' : score > 40 ? 'MEDIUM' : 'LOW',
      recommendation: score > 70 ? 'Send an extra reminder' : 'Standard flow',
    };
  }

  /**
   * Forecasts when a medicine will run out of stock
   */
  async forecastStock(medicineId: string, tenantId: string) {
    const medicine = await this.prisma.medicine.findUnique({ where: { id: medicineId } });
    if (!medicine) return null;

    // Simulate analysis of prescription history to find consumption rate
    const dailyConsumption = Math.floor(Math.random() * 5) + 1; // Random 1-5 units/day for simulation
    const daysRemaining = Math.floor(medicine.stock / dailyConsumption);

    const estimatedOutOfStockDate = new Date();
    estimatedOutOfStockDate.setDate(estimatedOutOfStockDate.getDate() + daysRemaining);

    return {
      medicineName: medicine.name,
      currentStock: medicine.stock,
      dailyConsumptionRate: dailyConsumption,
      estimatedDaysRemaining: daysRemaining,
      estimatedOutOfStockDate,
      actionRequired: daysRemaining < 7 ? 'ORDER_NOW' : 'MONITOR',
    };
  }

  /**
   * Forecasts revenue for the next N days based on recent trends
   */
  async forecastRevenue(tenantId: string, daysToForecast: number = 7) {
    const last30Days = await this.prisma.bill.aggregate({
      where: { tenantId, createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
      _sum: { totalAmount: true },
      _count: true,
    });

    const averageDailyRevenue = (last30Days._sum.totalAmount || 0) / 30;
    const forecastedRevenue = averageDailyRevenue * daysToForecast;

    return {
      period: `${daysToForecast} Days`,
      averageDailyRevenue: averageDailyRevenue.toFixed(2),
      forecastedRevenue: forecastedRevenue.toFixed(2),
      trend: averageDailyRevenue > 5000 ? 'UPWARD' : 'STABLE',
    };
  }

  /**
   * Refines model weights based on actual outcomes (A/B testing / Feedback loop)
   */
  async fineTuneModels(tenantId: string) {
    this.logger.log(`Starting AI Fine-tuning for Tenant: ${tenantId}`);

    // Fetch actual no-show data from last 90 days to adjust weights
    const historicalData = await this.prisma.appointment.findMany({
      where: { 
        tenantId, 
        createdAt: { gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) },
        status: { in: ['COMPLETED', 'NO_SHOW'] }
      }
    });

    // In a real app, you would send this to a dedicated ML service (like TensorFlow/PyTorch)
    // Here we simulate the update of coefficients
    const noShowRate = historicalData.filter(a => a.status === 'NO_SHOW').length / historicalData.length;
    
    this.logger.log(`New No-Show baseline calculated: ${(noShowRate * 100).toFixed(2)}%`);
    
    return {
      status: 'UPDATED',
      newBaseline: noShowRate,
      updatedAt: new Date()
    };
  }
}
