import { PartialType } from '@nestjs/swagger';
import { CreateVolunteerDto } from './create-volunteer.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateVolunteerDto extends PartialType(CreateVolunteerDto) {
  @ApiProperty({
    description: 'The first name of the volunteer',
    type: 'string',
    example: 'Betty',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'The last name of the volunteer',
    type: 'string',
    example: 'Crocker',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'The phone number of the volunteer',
    type: 'string',
    example: '(567) 123-3456',
  })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    description: 'The email of the volunteer',
    type: 'string',
    example: 'betty.crocker@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The role of the volunteer',
    type: 'string',
    example: 'Advertising',
  })
  @IsString()
  role: string;
}
