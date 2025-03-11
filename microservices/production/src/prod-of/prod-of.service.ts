import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(productOfId: string): Promise<ProdOfDto | null> {
    const profile = await this._productOfModel.findOne({ _id: productOfId });
    if (!profile) {
      throw new NotFoundException(`ProductOf #${productOfId} not found`);
    }
    return profile;
  }

  async update(
    productOfId: string,
    productOf: UpdateProdOfDto,
  ): Promise<ProdOfDto | null> {
    const productOfToUpdate = await this._productOfModel.findByIdAndUpdate(
      productOfId,
      productOf,
    );
    if (!productOfToUpdate) {
      throw new NotFoundException(`ProductOf #${productOfId} not found`);
    } else {
      return this._productOfModel.findById(productOfId);
    }
  }

  async delete(id: string): Promise<ProdOfDto | null> {
    const productToDelete = await this._productOfModel.findById(id);
    if (!productToDelete) {
      throw new NotFoundException(`ProductOf #${id} not found`);
    } else {
      await this._productOfModel.deleteOne({ _id: id });
      return productToDelete;
    }
  }
}
