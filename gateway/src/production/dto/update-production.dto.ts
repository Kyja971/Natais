import { PartialType } from '@nestjs/mapped-types';
import { ProdOfDto } from './production.dto';


export class UpdateProductionDto extends PartialType(ProdOfDto) {}
