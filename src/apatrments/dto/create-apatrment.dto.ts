import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateApatrmentDto {
  @IsNumber()
  @ApiProperty({ description: 'The number of an apartment', required: true })
  AppartmentNumber: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The city of an apartment', required: true })
  City: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The street of an apartment', required: true })
  Street: string;

  @IsNumber()
  @ApiProperty({
    description: 'The building number of an apartment',
    required: true,
  })
  BuildingNumber: number;

  @IsNumber()
  @ApiProperty({
    description: 'The number of rooms of an apartment',
    required: true,
  })
  NumberOfRooms: number;

  @IsNumber()
  @ApiProperty({ description: 'The rent of an apartment', required: true })
  Rent: number;
}
