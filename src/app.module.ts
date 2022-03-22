import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactsModule } from './contacts/contacts.module';
import { ApatrmentsModule } from './apatrments/apatrments.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/home-residence'),
    ContactsModule,
    ApatrmentsModule,
    AuthModule,
  ],
})
export class AppModule {}
