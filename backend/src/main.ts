import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from './app.module';
import { initSwagger } from './config/swagger';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/public', express.static(join(__dirname, '..', 'public'))); // <-
  app.enableCors();
  initSwagger(app);
  await app.listen(8000);
}
bootstrap();
