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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prodOfService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdOfDto: UpdateProdOfDto) {
    return this.prodOfService.update(+id, updateProdOfDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prodOfService.remove(+id);
  }
}
