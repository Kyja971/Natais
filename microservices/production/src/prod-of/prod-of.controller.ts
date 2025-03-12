import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProdOfService } from './prod-of.service';
import { ProdOfDto } from './dto/prod-of.dto';
import { UpdateProdOfDto } from './dto/update-prod-of.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('prod-of')
export class ProdOfController {
  constructor(private readonly prodOfService: ProdOfService) {}

  @MessagePattern({ cmd: 'addProductOf'})
  add(production: any): Promise<ProdOfDto> {
    return this.prodOfService.add(production);
  }

  @MessagePattern({ cmd: 'findAllProductOf'})
  findAll(): Promise<Array<string>> {
    return this.prodOfService.findAll();
  }

  @MessagePattern({ cmd: 'findOneProduction'})
  findOne(@Param('id') id: string) {
    return this.prodOfService.findOne(id);
  }

  @MessagePattern({ cmd: 'updateProduction'})
  update(payload: any): Promise<ProdOfDto | null> {
    return this.prodOfService.update(payload.id, payload.updateProduction);
  }

  @MessagePattern({ cmd: 'deleteProduction'})
  delete(id: string) {
    return this.prodOfService.delete(id);
  }
}
