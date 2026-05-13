import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AppointmentStatus, AppointmentType } from '@prisma/client';
import {
  IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString, IsNumber,
} from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({ example: 'clxyz123patientid' })
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @ApiProperty({ example: 'clxyz456doctorid' })
  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @ApiProperty({ example: '2026-05-16T10:30:00.000Z' })
  @IsDateString()
  date: string;

  @ApiPropertyOptional({ example: '10:30 AM' })
  @IsString()
  @IsOptional()
  timeSlot?: string;

  @ApiPropertyOptional({ enum: AppointmentType, default: AppointmentType.REGULAR })
  @IsEnum(AppointmentType)
  @IsOptional()
  type?: AppointmentType;

  @ApiPropertyOptional({ example: 'Chest pain since 2 days' })
  @IsString()
  @IsOptional()
  reason?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  queueNo?: number;
}

export class UpdateAppointmentDto {
  @ApiPropertyOptional({ enum: AppointmentStatus })
  @IsEnum(AppointmentStatus)
  @IsOptional()
  status?: AppointmentStatus;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  queueNo?: number;
}

export class AppointmentQueryDto {
  @ApiPropertyOptional({ example: '2026-05-16' })
  @IsOptional()
  date?: string;

  @ApiPropertyOptional()
  @IsOptional()
  doctorId?: string;

  @ApiPropertyOptional({ enum: AppointmentStatus })
  @IsOptional()
  status?: AppointmentStatus;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  limit?: number;
}
