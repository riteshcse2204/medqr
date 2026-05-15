import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('invoice/:id')
  @ApiOperation({ summary: 'Download invoice PDF' })
  async downloadInvoice(@Param('id') id: string, @Res() res: Response) {
    // In real app, fetch invoice from DB here
    const mockData = {
      invoiceNumber: 'INV-' + id.slice(-4),
      patientName: 'Rahul Sharma',
      items: [
        { description: 'Consultation Fee', quantity: 1, price: 500 },
        { description: 'Paracetamol 500mg', quantity: 2, price: 50 },
      ],
      total: 600,
    };

    const pdfBuffer = await this.reportsService.generateInvoicePdf(mockData);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=invoice-${id}.pdf`,
      'Content-Length': pdfBuffer.length,
    });

    res.end(pdfBuffer);
  }
}
