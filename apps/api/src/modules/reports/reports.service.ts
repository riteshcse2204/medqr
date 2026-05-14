import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class ReportsService {
  async generateInvoicePdf(invoiceData: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', (err) => reject(err));

      // Header
      doc
        .fillColor('#444444')
        .fontSize(20)
        .text('MEDQR HOSPITAL', 50, 50)
        .fontSize(10)
        .text('123, Healthcare Road, New Delhi', 50, 80)
        .text('Phone: +91 9876543210', 50, 95)
        .moveDown();

      // Invoice Title
      doc
        .fontSize(18)
        .text(`INVOICE: ${invoiceData.invoiceNumber}`, 50, 150, { align: 'right' });

      doc.moveTo(50, 180).lineTo(550, 180).stroke();

      // Patient Info
      doc
        .fontSize(12)
        .text(`Patient: ${invoiceData.patientName}`, 50, 200)
        .text(`Date: ${new Date().toLocaleDateString()}`, 50, 215)
        .moveDown();

      // Table Header
      const tableTop = 250;
      doc
        .fontSize(10)
        .text('Item Description', 50, tableTop)
        .text('Quantity', 300, tableTop)
        .text('Price', 400, tableTop)
        .text('Total', 500, tableTop);

      doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

      // Items
      let currentY = tableTop + 30;
      invoiceData.items.forEach((item: any) => {
        doc
          .text(item.description, 50, currentY)
          .text(item.quantity.toString(), 300, currentY)
          .text(`Rs. ${item.price}`, 400, currentY)
          .text(`Rs. ${item.price * item.quantity}`, 500, currentY);
        currentY += 20;
      });

      doc.moveTo(50, currentY + 10).lineTo(550, currentY + 10).stroke();

      // Grand Total
      doc
        .fontSize(14)
        .text(`GRAND TOTAL: Rs. ${invoiceData.total}`, 50, currentY + 30, { align: 'right' });

      // Footer
      doc
        .fontSize(10)
        .text('This is a computer generated invoice and does not require a signature.', 50, 750, { align: 'center', width: 500 });

      doc.end();
    });
  }
}
