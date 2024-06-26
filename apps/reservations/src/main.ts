import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.useGlobalPipes(new ValidationPipe({  //acepte solo 
    whitelist: true,// proporcionada por el validation pipe
  }));
  app.useLogger(app.get(Logger));
  await app.listen(3000);
}
bootstrap();
