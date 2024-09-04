import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
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
