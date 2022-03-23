import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The username a user', required: true })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The password a user', required: true })
  password: string;
}
