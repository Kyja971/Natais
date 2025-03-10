import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { LigneTypeEnum } from './ligne-type-enum';

export class ProdOfDto {

    @IsNumber()
    numeroOf!: number;
  
    @IsString()
    numeroLot!: string;
  
    @IsString()
    article!: string;
  
    @IsEnum(LigneTypeEnum)
    ligne!: LigneTypeEnum;




    
  @IsArray()
  @IsOptional()
  readonly debutProduction: DebutProductionDTO[];
  @IsArray()
  @IsOptional()
  readonly controleHoraire: ControleHoraireDTO[];
  @IsArray()
  @IsOptional()
  readonly controle4h: Controle4hDTO[];
  @IsArray()
  @IsOptional()
  readonly finPoste: FinPosteDTO[];
}

export class DebutProductionDTO {
  @IsString()
  readonly heure: string;
  @IsBoolean()
  readonly conforme: boolean;
  @IsBoolean()
  readonly nonconforme: boolean;
  @IsString()
  @IsOptional()
  readonly commentaires: string;
}

export class ControleHoraireDTO {
  @IsString()
  readonly heure: string;
  @IsBoolean()
  readonly conformeHoraire: boolean;
  @IsBoolean()
  readonly nonconformeHoraire: boolean;
  @IsString()
  @IsOptional()
  readonly commentsHoraire: string;
}

export class Controle4hDTO {
  @IsString()
  readonly heureMetaux: string;
  @IsString()
  readonly controleMetaux: string;
  @IsString()
  readonly controleMetaux2: string;
  @IsBoolean()
  readonly ejectionConforme: boolean;
  @IsBoolean()
  readonly ejectionNonConforme: boolean;
  @IsString()
  @IsOptional()
  readonly commentEjecNonConforme: string;
  @IsString()
  readonly heureEtalonnage: string;
  @IsString()
  readonly heureEjection: string;

  @IsNumber()
  readonly EtalonnageMais: number;

  @IsNumber()
  readonly EtalonnageHuile: number;

  @IsNumber()
  @IsOptional()
  readonly EtalonnagePoudre: number;

  @IsBoolean()
  readonly prodAvecPoudre: boolean;

  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  readonly peseeMais_: number[];
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  readonly peseeHuile_: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @ValidateIf((o) => o.peseePoudre_ && o.peseePoudre_.length > 0)
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @IsOptional()
  readonly peseePoudre_?: number[];

  @IsString()
  readonly heureEclatement: string;
  @IsNumber()
  readonly volumeEclatement: number;
  @IsNumber()
  readonly maisNonEclates: number;
}

export class FinPosteDTO {
  @IsString()
  readonly heure: string;
  @IsBoolean()
  readonly conformeMaterielFin: boolean;
  @IsBoolean()
  readonly nonconformeMaterielFin: boolean;
  @IsString()
  @IsOptional()
  readonly commentsMaterielFin: string;
}
