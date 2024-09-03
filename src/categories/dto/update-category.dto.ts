import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
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
}
