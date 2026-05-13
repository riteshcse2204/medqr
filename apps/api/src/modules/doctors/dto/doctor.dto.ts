import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsEmail } from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty({ example: 'Dr. Priya Sharma' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Cardiology' })
  @IsString()
  @IsNotEmpty()
  specialization: string;

  @ApiPropertyOptional({ example: '9876543210' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: 'dr.priya@apollo.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: 'MCI/12345/2010' })
  @IsString()
  @IsOptional()
  registrationNo?: string;

  @ApiPropertyOptional({ example: 500 })
  @IsNumber()
  @IsOptional()
  consultFee?: number;
}

export class UpdateDoctorDto extends CreateDoctorDto {
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
