import { Injectable } from '@nestjs/common';
import { ProdOfDto } from './dto/prod-of.dto';
import { UpdateProdOfDto } from './dto/update-prod-of.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductOf } from './models/productOf-schema';

@Injectable()
export class ProdOfService {
  constructor(
    @InjectModel('ProductOf') private _productOfModel: Model<ProductOf>,
  ) {}

  async add(production: any): Promise<ProdOfDto> {
    const newProductOf = new this._productOfModel(production);
    const savedProductOf = await newProductOf.save();
    return savedProductOf;
  }

  findAll(): Promise<Array<string>> {
    return this._productOfModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} prodOf`;
  }

  update(id: number, updateProdOfDto: UpdateProdOfDto) {
    return `This action updates a #${id} prodOf`;
  }

  remove(id: number) {
    return `This action removes a #${id} prodOf`;
  }
}
