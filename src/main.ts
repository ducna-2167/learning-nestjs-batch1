import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'client'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useGlobalPipes(new ValidationPipe());
  app.setViewEngine('hbs');
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
