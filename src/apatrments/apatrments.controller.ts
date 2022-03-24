import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/role-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/custom.decorator';
import { Roles as userRoles } from 'src/users/schemas/user.schema';
import { ApatrmentsService } from './apatrments.service';
import { CreateApatrmentDto } from './dto/create-apatrment.dto';
import { UpdateApatrmentDto } from './dto/update-apatrment.dto';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('apatrments')
@Controller('apatrments')
export class ApatrmentsController {
  constructor(private readonly apatrmentsService: ApatrmentsService) {}

  @UseGuards(RolesGuard)
  @Roles(userRoles.Admin)
  @ApiCreatedResponse({ description: 'Created New Apartment' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Post()
  create(@Body() createApatrmentDto: CreateApatrmentDto) {
    return this.apatrmentsService.create(createApatrmentDto);
  }

  @ApiOkResponse({ description: 'OK' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Get()
  findAll() {
    return this.apatrmentsService.findAll();
  }

  @ApiOkResponse({ description: 'OK' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Apartment Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apatrmentsService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles(userRoles.Admin)
  @ApiOkResponse({ description: 'OK' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Apartment Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApatrmentDto: UpdateApatrmentDto,
  ) {
    return this.apatrmentsService.update(id, updateApatrmentDto);
  }

  @UseGuards(RolesGuard)
  @Roles(userRoles.Admin)
  @ApiOkResponse({ description: 'OK' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Apartment Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apatrmentsService.remove(id);
  }
}
