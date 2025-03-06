import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductionService } from './production.service';
import { ProductionDto } from './dto/production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { Observable, take } from 'rxjs';

@Controller('production')
export class ProductionController {
  constructor(private readonly productionService: ProductionService) {}

  @Post()
  add(@Body() production: ProductionDto):Observable<ProductionDto> {
    return this.productionService.add(production).pipe((take(1)));
  }

  @Get()
  findAll(): Observable<Array<ProductionDto>> {
    return this.productionService.findAll().pipe((take(1)));
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<ProductionDto> {
    return this.productionService.findOne(id).pipe((take(1)));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProduction: UpdateProductionDto): Observable<UpdateProductionDto> {
    return this.productionService.update(id, updateProduction).pipe((take(1)));
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productionService.delete(id);
  }
}
