import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());
  
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        Logger.log(errors);
      },
      skipNullProperties: true,
      skipMissingProperties: true,
      skipUndefinedProperties: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
