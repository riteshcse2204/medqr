import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import * as QRCode from 'qrcode';

@Injectable()
export class ReportsService {
  async generateInvoicePdf(invoiceData: any): Promise<Buffer> {
    const qrCodeDataUrl = await QRCode.toDataURL(
      `https://medqr.com/verify/bill/${invoiceData.invoiceNumber}`,
    );

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', (err) => reject(err));

      // Header with Accent
      doc.rect(0, 0, 600, 120).fill('#f8fafc');

      doc
        .fillColor('#1e293b')
        .fontSize(24)
        .font('Helvetica-Bold')
        .text(invoiceData.hospitalName || 'MEDQR HOSPITAL', 50, 45)
        .fontSize(10)
        .font('Helvetica')
        .text(invoiceData.hospitalAddress || '123, Healthcare Road, New Delhi', 50, 75)
        .text(`Phone: ${invoiceData.hospitalPhone || '+91 9876543210'}`, 50, 90);

      // QR Code for Verification
      doc.image(qrCodeDataUrl, 480, 30, { width: 70 });
      doc.fontSize(8).text('Scan to Verify', 485, 105, { width: 70, align: 'center' });

      // Invoice Details
      doc
        .fillColor('#64748b')
        .fontSize(10)
        .text('INVOICE TO:', 50, 160)
        .fillColor('#1e293b')
        .fontSize(14)
        .font('Helvetica-Bold')
        .text(invoiceData.patientName, 50, 175)
        .font('Helvetica')
        .fontSize(10)
        .text(`Date: ${new Date().toLocaleDateString()}`, 50, 195);

      doc
        .fillColor('#64748b')
        .text('INVOICE NO:', 400, 160, { align: 'right' })
        .fillColor('#1e293b')
        .fontSize(14)
        .font('Helvetica-Bold')
        .text(invoiceData.invoiceNumber, 400, 175, { align: 'right' });

      // Table Header
      const tableTop = 260;
      doc.rect(50, tableTop, 500, 25).fill('#3b82f6');
      doc
        .fillColor('#ffffff')
        .fontSize(10)
        .font('Helvetica-Bold')
        .text('Item Description', 60, tableTop + 8)
        .text('Qty', 320, tableTop + 8)
        .text('Rate', 400, tableTop + 8)
        .text('Total', 480, tableTop + 8);

      // Items
      let currentY = tableTop + 35;
      doc.fillColor('#1e293b').font('Helvetica');

      invoiceData.items.forEach((item: any) => {
        doc
          .text(item.description, 60, currentY)
          .text(item.quantity.toString(), 320, currentY)
          .text(`₹${item.price}`, 400, currentY)
          .text(`₹${item.price * item.quantity}`, 480, currentY);

        doc.moveTo(50, currentY + 15).lineTo(550, currentY + 15).strokeColor('#e2e8f0').stroke();
        currentY += 25;
      });

      // Totals
      currentY += 20;
      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .text('Subtotal:', 350, currentY)
        .text(`₹${invoiceData.total}`, 480, currentY);

      currentY += 20;
      doc
        .fontSize(16)
        .fillColor('#3b82f6')
        .text('GRAND TOTAL:', 350, currentY)
        .text(`₹${invoiceData.total}`, 480, currentY);

      // Footer
      doc
        .fillColor('#94a3b8')
        .fontSize(10)
        .font('Helvetica')
        .text('This is a computer-generated invoice and does not require a signature.', 50, 750, { align: 'center', width: 500 })
        .text('Thank you for choosing MedQR!', 50, 765, { align: 'center', width: 500 });

      doc.end();
    });
  }
}
