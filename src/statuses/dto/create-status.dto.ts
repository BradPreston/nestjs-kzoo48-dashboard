import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateStatusDto {
  @ApiProperty({
    title: 'name',
    description: 'The name of the status',
    example: 'active',
  })
  @IsString()
  name: string;
}
