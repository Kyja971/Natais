import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class ProductionDto {
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
    readonly EtalonnagePoudre: number;
    @IsBoolean()
    readonly prodAvecPoudre: boolean;
    @IsArray()
    @IsNumber()
    readonly peseeMais_: number[];
    @IsArray()
    @IsNumber()
    readonly peseeHuile_: number[];
    @IsArray()
    @IsNumber()
    readonly peseePoudre_: number[];
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
    readonly commentsMaterielFin: string;
  }