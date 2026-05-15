import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class BillItemDto {
  @ApiProperty({ example: 'Consultation Fee' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 500 })
  @IsNumber()
  @Min(0)
  unitPrice: number;

  @ApiPropertyOptional({ example: '9983' })
  @IsString()
  @IsOptional()
  hsnCode?: string;

  @ApiPropertyOptional({ example: 18 })
  @IsNumber()
  @IsOptional()
  gstRate?: number;
}

export class CreateBillDto {
  @ApiProperty({ example: 'clxyz123patientid' })
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @ApiPropertyOptional({ example: 'clbranch123' })
  @IsString()
  @IsOptional()
  branchId?: string;

  @ApiProperty({ type: [BillItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BillItemDto)
  items: BillItemDto[];

  @ApiPropertyOptional({ example: 50 })
  @IsNumber()
  @IsOptional()
  discount?: number;

  @ApiPropertyOptional({ example: 'CASH' })
  @IsString()
  @IsOptional()
  paymentMode?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateBillDto {
  @ApiPropertyOptional({ example: 500 })
  @IsNumber()
  @IsOptional()
  paidAmount?: number;

  @ApiPropertyOptional({ example: 'UPI' })
  @IsString()
  @IsOptional()
  paymentMode?: string;
}
