import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EncounterType } from '../../../prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsUUID,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PrescriptionItemDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  medicineId?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  medicineName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  dosage: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  frequency: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  duration: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  instructions?: string;
}

export class CreateEncounterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  appointmentId?: string;

  @ApiProperty({ enum: EncounterType })
  @IsEnum(EncounterType)
  type: EncounterType;

  @ApiPropertyOptional()
  @IsOptional()
  vitals?: any;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  diagnosis?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional({ type: [PrescriptionItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PrescriptionItemDto)
  @IsOptional()
  prescriptions?: PrescriptionItemDto[];
}

export class CreatePrescriptionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  encounterId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ type: [PrescriptionItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PrescriptionItemDto)
  items: PrescriptionItemDto[];
}
