import { Inject, Injectable } from '@nestjs/common';

import { UpdateProductionDto } from './dto/update-production.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ProdOfDto } from './dto/production.dto';

@Injectable()
export class ProductionService {
  constructor(@Inject('PRODUCTION') private _client: ClientProxy
) { }

  add(production: ProdOfDto): Observable<ProdOfDto> {
    const pattern: any = { cmd: 'addProductOf'};
    return this._client.send<ProdOfDto>(pattern, production)
  }

  findAll(): Observable<Array<ProdOfDto>> {
    const pattern: any = { cmd: 'findAllProductOf'};
    return this._client.send<ProdOfDto[]>(pattern, {})
  }

  findOne(id: string): Observable<ProdOfDto> {
    const pattern: any = { cmd: 'findOneProduction'};
    return this._client.send<ProdOfDto>(pattern, id)
  }

  update(id: string, updateProduction: UpdateProductionDto): Observable<UpdateProductionDto> {
    const payload: any = { id , updateProduction: updateProduction }
    const pattern: any = { cmd: 'updateProduction'};
    return this._client.send<UpdateProductionDto>(pattern, payload)
  }

  delete(id: string) {
    const pattern: any = { cmd: 'deleteProduction'};
    return this._client.send<ProdOfDto>(pattern, id)
  }
}
