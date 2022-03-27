import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateApatrmentDto } from './create-apatrment.dto';

export class UpdateApatrmentDto extends PartialType(CreateApatrmentDto) {
  @IsNumber()
  @ApiProperty({ description: 'The number of an apartment' })
  @IsOptional()
  AppartmentNumber: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The city of an apartment' })
  @IsOptional()
  City: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The street of an apartment' })
  @IsOptional()
  Street: string;

  @IsNumber()
  @ApiProperty({
    description: 'The building number of an apartment',
    required: true,
  })
  @IsOptional()
  BuildingNumber: number;

  @IsNumber()
  @ApiProperty({
    description: 'The number of rooms of an apartment',
    required: true,
  })
  @IsOptional()
  NumberOfRooms: number;

  @IsNumber()
  @ApiProperty({ description: 'The rent of an apartment' })
  @IsOptional()
  Rent: number;
}
