import { Module } from '@nestjs/common';
import { ProdOfService } from './prod-of.service';
import { ProdOfController } from './prod-of.controller';

@Module({
  controllers: [ProdOfController],
  providers: [ProdOfService],
})
export class ProdOfModule {}
