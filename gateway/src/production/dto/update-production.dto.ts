import { PartialType } from '@nestjs/mapped-types';
import { ProductionDto } from './production.dto';

export class UpdateProductionDto extends PartialType(ProductionDto) {}
