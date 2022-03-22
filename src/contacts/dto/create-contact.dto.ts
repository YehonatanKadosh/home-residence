import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';
import { Pet, phoneNumberPattern } from '../schemas/contact.schema';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The first name of a contact', required: true })
  FirstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The last name of a contact', required: true })
  LastName: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('IL')
  @Matches(phoneNumberPattern)
  @ApiProperty({
    description: 'The phone number of a contact',
    required: true,
  })
  PhoneNumber: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The appartment number of a contact',
    required: true,
  })
  AppartmentNumber: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The pets list of a contact',
    type: [Pet],
    enum: Pet,
    default: [],
    isArray: true,
  })
  pets: Pet[] = [];
}
