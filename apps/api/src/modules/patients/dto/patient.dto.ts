import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsEnum,
  IsDateString,
  IsMobilePhone,
} from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({ example: 'Ramesh Kumar' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '9876543210' })
  @IsMobilePhone('en-IN')
  phone: string;

  @ApiPropertyOptional({ example: 'patient@gmail.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  gender: Gender;

  @ApiPropertyOptional({ example: '1990-05-15' })
  @IsDateString()
  @IsOptional()
  dob?: string;

  @ApiPropertyOptional({ example: 'B+' })
  @IsString()
  @IsOptional()
  bloodGroup?: string;

  @ApiPropertyOptional({ example: '12 MG Road, Bengaluru' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ example: 'ABHA1234567890' })
  @IsString()
  @IsOptional()
  abhaId?: string;
}

export class UpdatePatientDto extends CreatePatientDto {}

export class PatientQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  limit?: number;
}
