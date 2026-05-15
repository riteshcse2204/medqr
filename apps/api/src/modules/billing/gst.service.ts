import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class GstService {
  private readonly logger = new Logger(GstService.name);

  /**
   * Calculates GST breakdown for a bill
   */
  calculateGst(items: any[]) {
    let taxableAmount = 0;
    let cgst = 0;
    let sgst = 0;
    let igst = 0;

    items.forEach(item => {
      const itemTaxable = item.unitPrice * item.quantity;
      const gstAmount = (itemTaxable * (item.gstRate || 0)) / 100;
      
      taxableAmount += itemTaxable;
      
      // Simple split for CGST/SGST (Intra-state)
      cgst += gstAmount / 2;
      sgst += gstAmount / 2;
    });

    return {
      taxableAmount,
      cgst,
      sgst,
      igst,
      totalAmount: taxableAmount + cgst + sgst + igst
    };
  }

  /**
   * Generates IRN (Invoice Reference Number) via GSP API (Mock)
   */
  async generateIrn(billData: any) {
    this.logger.log(`Generating IRN for Bill: ${billData.billNo}`);
    
    // In production, call ClearTax or other GSP
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
      irn: `IRN-${Math.random().toString(36).toUpperCase().substring(0, 16)}`,
      ackNo: `ACK-${Math.floor(Math.random() * 100000000)}`,
      status: 'ACT'
    };
  }
}
