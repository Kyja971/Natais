import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'production_queue',
      queueOptions: {
        durable: false
      },
    },
  }
  );
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
  await app.listen();
}
bootstrap();
