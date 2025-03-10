import { Expose } from 'class-transformer';
import { LigneTypeEnum } from './ligne-type-enum';

export class ProductOf {
  @Expose({ name: '_id' })
  id?: string;

  @Expose()
  numeroOf!: number;

  @Expose()
  numeroLot!: string;

  @Expose()
  article!: string;
  @Expose()
  ligne!: LigneTypeEnum;

  @Expose()
  debutProduction!: DebutProductionDTO[];

  @Expose()
  controleHoraire!: ControleHoraireDTO[];

  @Expose()
  controle4h!: Controle4hDTO[];

  @Expose()
  finPoste!: FinPosteDTO[];
}

export class DebutProductionDTO {
  @Expose()
  heure!: string;

  @Expose()
  conforme!: boolean;

  @Expose()
  nonconforme!: boolean;

  @Expose()
  commentaires?: string;
}

export class ControleHoraireDTO {
  @Expose()
  heure!: string;

  @Expose()
  conformeHoraire!: boolean;

  @Expose()
  nonconformeHoraire!: boolean;

  @Expose()
  commentsHoraire?: string;
}

export class Controle4hDTO {
  @Expose()
  heureMetaux!: string;

  @Expose()
  controleMetaux!: string;

  @Expose()
  controleMetaux2!: string;

  @Expose()
  ejectionConforme!: boolean;

  @Expose()
  ejectionNonConforme!: boolean;

  @Expose()
  commentEjecNonConforme?: string;

  @Expose()
  heureEtalonnage!: string;

  @Expose()
  heureEjection!: string;

  @Expose()
  EtalonnageMais!: number;

  @Expose()
  EtalonnageHuile!: number;

  @Expose()
  EtalonnagePoudre?: number;

  @Expose()
  prodAvecPoudre!: boolean;

  @Expose()
  peseeMais_!: number[];

  @Expose()
  peseeHuile_!: number[];

  @Expose()
  peseePoudre_?: number[];

  @Expose()
  heureEclatement!: string;

  @Expose()
  volumeEclatement!: number;

  @Expose()
  maisNonEclates!: number;
}

export class FinPosteDTO {
  @Expose()
  heure!: string;

  @Expose()
  conformeMaterielFin!: boolean;

  @Expose()
  nonconformeMaterielFin!: boolean;

  @Expose()
  commentsMaterielFin?: string;
}
