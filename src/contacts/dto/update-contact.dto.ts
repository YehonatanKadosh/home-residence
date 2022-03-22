import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';
import { Pet, phoneNumberPattern } from '../schemas/contact.schema';
import { CreateContactDto } from './create-contact.dto';

export class UpdateContactDto extends PartialType(CreateContactDto) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ description: 'The first name of a contact' })
  FirstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The last name of a contact' })
  @IsOptional()
  LastName: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('IL')
  @Matches(phoneNumberPattern)
  @IsOptional()
  @ApiProperty({
    description: 'The phone number of a contact',
    required: true,
  })
  PhoneNumber: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'The appartment number of a contact',
    required: true,
  })
  AppartmentNumber: number;

  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'The pets list of a contact',
    type: [Pet],
    enum: Pet,
    default: [],
    isArray: true,
  })
  pets: Pet[] = [];
}
