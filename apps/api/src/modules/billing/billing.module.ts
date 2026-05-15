import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { GstService } from './gst.service';
import { RazorpayService } from './razorpay.service';

@Module({
  controllers: [BillingController],
  providers: [BillingService, GstService, RazorpayService],
  exports: [BillingService, GstService, RazorpayService],
})
export class BillingModule {}
