import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MongooseException } from './exeptions/mongoose.exeption';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger config
  const config = new DocumentBuilder()
    .setTitle('Home Residance')
    .setDescription('Home Residance API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token',
    )
    .build();
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Home Residence API Docs',
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document, customOptions);

  // handle mongoose errors
  app.useGlobalFilters(new MongooseException());

  await app.listen(3000);
}
bootstrap();
