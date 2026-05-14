import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';

@Processor('notifications')
export class NotificationsProcessor extends WorkerHost {
  private readonly logger = new Logger(NotificationsProcessor.name);

  async process(job: Job<any, any, string>): Promise<any> {
    const { tenantId, phone, message, type, email, subject } = job.data;

    this.logger.log(`Processing ${type} for tenant ${tenantId}...`);

    switch (job.name) {
      case 'send-whatsapp':
        // Here you would integrate with Meta WhatsApp API or Twilio
        this.logger.log(`WHATSAPP SENT to ${phone}: ${message}`);
        break;

      case 'send-sms':
        // Integrate with SMS Gateway
        this.logger.log(`SMS SENT to ${phone}: ${message}`);
        break;

      case 'send-email':
        // Integrate with Nodemailer / AWS SES
        this.logger.log(`EMAIL SENT to ${email}: ${subject}`);
        break;

      default:
        this.logger.warn(`Unknown job name: ${job.name}`);
    }

    return { success: true };
  }
}
