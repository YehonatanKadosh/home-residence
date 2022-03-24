import { Module } from '@nestjs/common';
import { ApatrmentsService } from './apatrments.service';
import { ApatrmentsController } from './apatrments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Apartment, ApartmentSchema } from './schemas/apatrment.schema';
import { ContactsModule } from 'src/contacts/contacts.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Apartment.name, schema: ApartmentSchema },
    ]),
    ContactsModule,
  ],
  controllers: [ApatrmentsController],
  providers: [ApatrmentsService],
  exports: [ApatrmentsService],
})
export class ApatrmentsModule {}
