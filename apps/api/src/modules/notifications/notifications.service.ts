import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class NotificationsService {
  constructor(@InjectQueue('notifications') private notificationQueue: Queue) {}

  async sendWhatsApp(tenantId: string, phone: string, message: string) {
    await this.notificationQueue.add('send-whatsapp', {
      tenantId,
      phone,
      message,
      type: 'WHATSAPP',
    });
  }

  async sendSMS(tenantId: string, phone: string, message: string) {
    await this.notificationQueue.add('send-sms', {
      tenantId,
      phone,
      message,
      type: 'SMS',
    });
  }

  async sendEmail(tenantId: string, email: string, subject: string, body: string) {
    await this.notificationQueue.add('send-email', {
      tenantId,
      email,
      subject,
      body,
      type: 'EMAIL',
    });
  }
}
