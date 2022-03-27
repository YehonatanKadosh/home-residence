import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/role-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles, SkipJWTAuth } from 'src/custom.decorator';
import { Roles as userRoles } from 'src/users/schemas/user.schema';
import { ApatrmentsService } from './apatrments.service';
import { CreateApatrmentDto } from './dto/create-apatrment.dto';
import { UpdateApatrmentDto } from './dto/update-apatrment.dto';
import { RazeBuildingRentDto } from './dto/raze-building-rent.dto';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('apatrments')
@Controller('apatrments')
export class ApatrmentsController {
  constructor(private readonly apatrmentsService: ApatrmentsService) {}

  @UseGuards(RolesGuard)
  @Roles(userRoles.Admin)
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiCreatedResponse({ description: 'Created New Apartment' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Post()
  create(@Body() createApatrmentDto: CreateApatrmentDto) {
    return this.apatrmentsService.create(createApatrmentDto);
  }

  @UseGuards(RolesGuard)
  @Roles(userRoles.Admin)
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiCreatedResponse({ description: 'Created New Contacts' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Post('/multiple')
  createMany(@Body() createContactDto: CreateApatrmentDto[]) {
    return this.apatrmentsService.createMany(createContactDto);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: 'OK' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Get()
  findAll() {
    return this.apatrmentsService.findAll();
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
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
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiCreatedResponse({ description: 'Updated Rent' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Patch('/razeRent')
  razeRent(@Query('id') id: string, @Query('precentage') precentage: number) {
    return this.apatrmentsService.razeRent(id, precentage);
  }

  @UseGuards(RolesGuard)
  @Roles(userRoles.Admin)
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiCreatedResponse({ description: 'Updated Rent' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Patch('/razeBuildingRent')
  razeBuildingRent(
    @Query('precentage') precentage: number,
    @Body() razeBuildingRentDto: RazeBuildingRentDto,
  ) {
    return this.apatrmentsService.razeBuildingRent(
      razeBuildingRentDto,
      precentage,
    );
  }

  @UseGuards(RolesGuard)
  @Roles(userRoles.Admin)
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
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
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: 'OK' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Apartment Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Delete('/building')
  removeByBuilding(
    @Query('city') city: string,
    @Query('street') street: string,
    @Query('buildingNumber') buildingNumber: number,
  ) {
    return this.apatrmentsService.removeBuilding(city, street, buildingNumber);
  }

  @UseGuards(RolesGuard)
  @Roles(userRoles.Admin)
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: 'OK' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Apartment Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apatrmentsService.remove(id);
  }

  @SkipJWTAuth()
  @ApiOkResponse({ description: 'OK' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Delete('root/:secret')
  removeAll(@Param('secret') secret: string) {
    if (secret !== process.env.SECRET)
      throw new UnauthorizedException('secret key not matched');
    return this.apatrmentsService.removeAll();
  }
}
