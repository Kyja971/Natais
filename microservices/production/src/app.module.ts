import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdOfModule } from './prod-of/prod-of.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProdOfController } from './prod-of/prod-of.controller';
import { ProductOfSchema } from './prod-of/models/productOf-schema';
import { ProdOfService } from './prod-of/prod-of.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`,
      {
        dbName: 'production_db_admin',
      },
    ),
    MongooseModule.forFeature([
      { name: 'ProductOf', schema: ProductOfSchema },
    ]),
    ClientsModule.register([
      {
        name: 'PRODUCTION',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'production_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AppController,ProdOfController],
  providers: [AppService,ProdOfService],
})
export class AppModule {}
