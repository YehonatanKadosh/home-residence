import { ApiProperty } from '@nestjs/swagger';

export class CreateApatrmentDto {
  @ApiProperty({ description: 'The number of an apartment', required: true })
  AppartmentNumber: number;

  @ApiProperty({ description: 'The city of an apartment', required: true })
  City: string;

  @ApiProperty({ description: 'The street of an apartment', required: true })
  Street: string;

  @ApiProperty({
    description: 'The building number of an apartment',
    required: true,
  })
  BuildingNumber: number;

  @ApiProperty({
    description: 'The number of rooms of an apartment',
    required: true,
  })
  NumberOfRooms: number;

  @ApiProperty({ description: 'The rent of an apartment', required: true })
  Rent: number;
}
