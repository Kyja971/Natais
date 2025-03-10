import { PartialType } from '@nestjs/mapped-types';
import { ProdOfDto } from './prod-of.dto';

export class UpdateProdOfDto extends PartialType(ProdOfDto) {}
