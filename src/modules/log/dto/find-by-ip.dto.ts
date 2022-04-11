import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindByIPDto {
  @ApiProperty({ required: false })
  @IsString()
  ip?: string;
}
