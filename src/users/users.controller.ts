import { Controller, Get } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SkipJWTAuth } from 'src/custom.decorator';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ description: 'OK' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @SkipJWTAuth()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
