import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    type: 'string',
    example: 'Amatuer',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The id of the status',
    type: 'number',
    example: 1,
  })
  @IsInt()
  statusId: number;
}
