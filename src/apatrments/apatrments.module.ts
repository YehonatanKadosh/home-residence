import { Module } from '@nestjs/common';
import { ApatrmentsService } from './apatrments.service';
import { ApatrmentsController } from './apatrments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Apartment, ApartmentSchema } from './schemas/apatrment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Apartment.name, schema: ApartmentSchema },
    ]),
  ],
  controllers: [ApatrmentsController],
  providers: [ApatrmentsService],
})
export class ApatrmentsModule {}
