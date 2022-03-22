import { PartialType } from '@nestjs/swagger';
import { CreateApatrmentDto } from './create-apatrment.dto';

export class UpdateApatrmentDto extends PartialType(CreateApatrmentDto) {}
