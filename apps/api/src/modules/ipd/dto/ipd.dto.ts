import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { WardType, BedStatus, AdmissionStatus } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
} from 'class-validator';

export class CreateWardDto {
  @ApiProperty({ example: 'General Ward A' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: WardType })
  @IsEnum(WardType)
  type: WardType;

  @ApiPropertyOptional({ example: '1st Floor' })
  @IsString()
  @IsOptional()
  floor?: string;
}

export class CreateBedDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  wardId: string;

  @ApiProperty({ example: 'G101' })
  @IsString()
  @IsNotEmpty()
  bedNumber: string;

  @ApiPropertyOptional({ enum: BedStatus, default: BedStatus.AVAILABLE })
  @IsEnum(BedStatus)
  @IsOptional()
  status?: BedStatus;
}

export class CreateAdmissionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  bedId: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  admissionDate?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  reason?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  notes?: string;
}

export class DischargeDto {
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  dischargeDate: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  notes?: string;
}
