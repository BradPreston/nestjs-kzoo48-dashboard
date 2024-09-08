import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    name: 'Email',
    description: 'The email of the user to login',
    type: 'string',
  })
  @IsString()
  email: string;

  @ApiProperty({
    name: 'Password',
    description: 'The password of the user to login',
    type: 'string',
  })
  @IsString()
  password: string;
}
