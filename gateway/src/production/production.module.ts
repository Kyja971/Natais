import { Module } from '@nestjs/common';
import { ProductionService } from './production.service';
import { ProductionController } from './production.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
      ConfigModule.forRoot(),
      ClientsModule.register([
        {
          name: 'PRODUCTION',
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5672'],
            queue: 'production_queue',
            queueOptions: {
              durable: false
            },
          },
        },
      ]),
    ],
  controllers: [ProductionController],
  providers: [ProductionService],
})
export class ProductionModule {}
