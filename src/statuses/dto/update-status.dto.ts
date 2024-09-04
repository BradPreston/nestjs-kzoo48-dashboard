import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateStatusDto } from './create-status.dto';

export class UpdateStatusDto extends PartialType(CreateStatusDto) {
  @ApiProperty({
    title: 'name',
    description: 'The name of the status',
    example: 'active',
  })
  @IsString()
  name: string;
}
