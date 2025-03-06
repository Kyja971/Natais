import { Inject, Injectable } from '@nestjs/common';
import { ProductionDto } from './dto/production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class ProductionService {
  constructor(@Inject('PRODUCTION') private _client: ClientProxy
) { }

  add(production: ProductionDto): Observable<ProductionDto> {
    const pattern: any = { cmd: 'addProduction'};
    return this._client.send<ProductionDto>(pattern, production)
  }

  findAll(): Observable<Array<ProductionDto>> {
    const pattern: any = { cmd: 'findAllProduction'};
    return this._client.send<ProductionDto[]>(pattern, {})
  }

  findOne(id: string): Observable<ProductionDto> {
    const pattern: any = { cmd: 'findOneProduction'};
    return this._client.send<ProductionDto>(pattern, id)
  }

  update(id: string, updateProduction: UpdateProductionDto): Observable<UpdateProductionDto> {
    const payload: any = { id , updateProduction: updateProduction }
    const pattern: any = { cmd: 'updateProduction'};
    return this._client.send<UpdateProductionDto>(pattern, payload)
  }

  delete(id: string) {
    const pattern: any = { cmd: 'deleteProduction'};
    return this._client.send<ProductionDto>(pattern, id)
  }
}
