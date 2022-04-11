import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLogDto {
  @ApiProperty({ required: true })
  @IsString()
  service_id: string;

  @ApiProperty({ required: true })
  @IsString()
  operator: string;

  @ApiProperty({ required: true })
  @IsString()
  msisdn: string;

  @ApiProperty({ required: true })
  @IsString()
  cid: string;

  @ApiProperty({ required: true })
  @IsString()
  media_code: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  short_code?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  appear_time?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  hit_time?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  time_on_page?: number;

  @ApiProperty({ required: false })
  @IsBoolean()
  is_bot?: boolean;
}
