import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactsModule } from './contacts/contacts.module';
import { ApatrmentsModule } from './apatrments/apatrments.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ContactsModule,
    ApatrmentsModule,
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(process.env.MONGO_KEY),
  ],
  controllers: [AppController],
})
export class AppModule {}
