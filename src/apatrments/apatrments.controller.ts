import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApatrmentsService } from './apatrments.service';
import { CreateApatrmentDto } from './dto/create-apatrment.dto';
import { UpdateApatrmentDto } from './dto/update-apatrment.dto';

@ApiTags('apatrments')
@Controller('apatrments')
export class ApatrmentsController {
  constructor(private readonly apatrmentsService: ApatrmentsService) {}

  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post()
  create(@Body() createApatrmentDto: CreateApatrmentDto) {
    return this.apatrmentsService.create(createApatrmentDto);
  }

  @Get()
  findAll() {
    return this.apatrmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apatrmentsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApatrmentDto: UpdateApatrmentDto,
  ) {
    return this.apatrmentsService.update(id, updateApatrmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apatrmentsService.remove(id);
  }
}
