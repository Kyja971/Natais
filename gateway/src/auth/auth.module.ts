import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports : [  
    ClientsModule.register([
    {
      name: 'AUTH',
      transport: Transport.RMQ,
      options: {
        urls:['amqp://localhost:5672'],
        queue: 'auth_queue',
        queueOptions: {
          durable: false
        },
      },
    },
  ]),]
})
export class AuthModule {}
