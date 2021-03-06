/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if(!configService.isProduction()) {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder().setTitle('API').setDescription('MY APP API').build()
    );

    SwaggerModule.setup('swagger', app, document);
  }
  console.log('server is listening on port 2019')
  app.enableCors();
  await app.listen(2019);
}
bootstrap();
