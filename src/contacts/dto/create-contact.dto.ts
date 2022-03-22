import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, Matches } from 'class-validator';
import { Pet, phoneNumberPattern } from '../schemas/contact.schema';

export class CreateContactDto {
  @ApiProperty({ description: 'The first name of a contact', required: true })
  FirstName: string;

  @ApiProperty({ description: 'The last name of a contact', required: true })
  LastName: string;

  @IsPhoneNumber('IL')
  @Matches(phoneNumberPattern)
  @ApiProperty({
    description: 'The phone number of a contact',
    required: true,
  })
  PhoneNumber: string;

  @ApiProperty({
    description: 'The appartment number of a contact',
    required: true,
  })
  AppartmentNumber: number;

  @ApiProperty({
    description: 'The pets list of a contact',
    type: [Pet],
    enum: Pet,
    default: [],
    isArray: true,
  })
  pets: Pet[] = [];
}
