import { Controller, Post, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { TelemedicineService } from './telemedicine.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Telemedicine')
@ApiBearerAuth()
@Controller('telemedicine')
export class TelemedicineController {
  constructor(private readonly telemedicineService: TelemedicineService) {}

  @Post('session/:appointmentId')
  @ApiOperation({ summary: 'Create a telemedicine session for an appointment' })
  async createSession(@Param('appointmentId') appointmentId: string) {
    return this.telemedicineService.createSession(appointmentId);
  }

  @Get('session/:appointmentId')
  @ApiOperation({ summary: 'Get telemedicine session by appointment ID' })
  async getSession(@Param('appointmentId') appointmentId: string) {
    return this.telemedicineService.getSessionByAppointment(appointmentId);
  }

  @Patch('session/:id/start')
  @ApiOperation({ summary: 'Start a telemedicine session' })
  async startSession(@Param('id') id: string) {
    return this.telemedicineService.startSession(id);
  }

  @Patch('session/:id/complete')
  @ApiOperation({ summary: 'Complete a telemedicine session' })
  async completeSession(@Param('id') id: string) {
    return this.telemedicineService.completeSession(id);
  }
}
