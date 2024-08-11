import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateEntryDto {
  @ApiProperty({
    description: 'The first name of the team leader',
    type: 'string',
    example: 'John',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'The last name of the team leader',
    type: 'string',
    example: 'Doe',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'The phone number of the team leader',
    type: 'string',
    example: '(123) 456-7890',
  })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    description: 'The email of the team leader',
    type: 'string',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The category of the team',
    type: 'string',
    example: 'Amatuer',
  })
  @IsInt()
  categoryId: number;

  @ApiProperty({
    description: 'The name of the team',
    type: 'string',
    example: "John's Awesome Team",
  })
  @IsString()
  teamName: string;

  @ApiProperty({
    description: 'Emails of other team members',
    type: 'string[]',
    example: ['janet.michael@example.com', 'peter.donovan@domain.com'],
  })
  @IsArray()
  @IsOptional()
  additionalEmails: string[];
}
