import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsInt, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    name: 'Email',
    description: 'The email of the user',
    type: 'string',
  })
  @IsString()
  email: string;

  @ApiProperty({
    name: 'Password',
    description: 'The password of the user',
    type: 'string',
  })
  @IsString()
  password: string;

  @ApiProperty({
    name: 'Status',
    description: 'The status of the user',
    type: 'number',
    example: 1,
  })
  @IsInt()
  statusId: number;
}
