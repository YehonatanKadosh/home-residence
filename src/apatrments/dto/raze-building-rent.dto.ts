import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RazeBuildingRentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "The building's city", required: true })
  City: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "The building's street", required: true })
  Street: string;

  @IsNumber()
  @ApiProperty({ description: 'The building number', required: true })
  BuildingNumber: number;
}
