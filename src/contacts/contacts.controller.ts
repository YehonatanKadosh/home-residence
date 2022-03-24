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
import { RolesGuard } from 'src/auth/admin-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/custom.decorator';
import { Roles as userRoles } from 'src/users/schemas/user.schema';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@ApiBearerAuth('access-token')
@ApiTags('contacts')
@UseGuards(JwtAuthGuard)
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @UseGuards(RolesGuard)
  @Roles(userRoles.Admin)
  @ApiCreatedResponse({ description: 'Created New Contact' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @ApiOkResponse({ description: 'OK' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  @ApiOkResponse({ description: 'OK' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Contact Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactsService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles(userRoles.Admin)
  @ApiOkResponse({ description: 'OK' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Contact Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactsService.update(id, updateContactDto);
  }

  @UseGuards(RolesGuard)
  @Roles(userRoles.Admin)
  @ApiOkResponse({ description: 'OK' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Contact Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsService.remove(id);
  }
}
