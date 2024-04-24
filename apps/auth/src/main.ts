import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.useGlobalPipes(new ValidationPipe({  // Validacion 
    whitelist: true,// proporcionada por el validation pipe
  }));
  app.useLogger(app.get(Logger));
  await app.listen(3001); // 3001 de docker compose yml
}
bootstrap();
//NUEVO
