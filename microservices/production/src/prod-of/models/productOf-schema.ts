import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LigneTypeEnum } from '../dto/ligne-type-enum';

@Schema()
export class DebutProduction {
  @Prop({ type: String, required: true })
  heure: string;

  @Prop({ type: Boolean, required: true })
  conforme: boolean;

  @Prop({ type: Boolean, required: true })
  nonconforme: boolean;

  @Prop({ type: String })
  commentaires: string;
}

@Schema()
export class ControleHoraire {
  @Prop({ type: String, required: true })
  heure: string;

  @Prop({ type: Boolean, required: true })
  conformeHoraire: boolean;

  @Prop({ type: Boolean, required: true })
  nonconformeHoraire: boolean;

  @Prop({ type: String })
  commentsHoraire: string;
}

@Schema()
export class Controle4h {
  @Prop({ type: String, required: true })
  heureMetaux: string;

  @Prop({ type: String, required: true })
  controleMetaux: string;

  @Prop({ type: String, required: true })
  controleMetaux2: string;

  @Prop({ type: Boolean, required: true })
  ejectionConforme: boolean;

  @Prop({ type: Boolean, required: true })
  ejectionNonConforme: boolean;

  @Prop({ type: String, required: true })
  commentEjecNonConforme: string;

  @Prop({ type: String, required: true })
  heureEtalonnage: string;

  @Prop({ type: String, required: true })
  heureEjection: string;

  @Prop({ type: Number, required: true })
  EtalonnageMais: number;

  @Prop({ type: Number, required: true })
  EtalonnageHuile: number;

  @Prop({ type: Number, required: true })
  EtalonnagePoudre: number;

  @Prop({ type: Boolean, required: true })
  prodAvecPoudre: boolean;

  @Prop({
    type: [Number],
    required: true,
    validate: {
      validator: (val: number[]) => val.length === 6,
      message: 'Le tableau peseeMais_ doit contenir exactement 6 valeurs',
    },
  })
  peseeMais_: number[];

  @Prop({
    type: [Number],
    required: true,
    validate: {
      validator: (val: number[]) => val.length === 6,
      message: 'Le tableau peseeHuile_ doit contenir exactement 6 valeurs',
    },
  })
  peseeHuile_: number[];

  @Prop({
    type: [Number],
    required: false,
    validate: {
      validator: (val: number[] | null | undefined) => {
        if (val === null || val === undefined || val.length === 0) {
          return true; // Autoriser null, undefined ou tableau vide
        }
        return val.length === 6; // Autoriser uniquement les tableaux de 6 éléments
      },
      message:
        'Si fourni, peseePoudre_ doit être vide ou contenir exactement 6 valeurs',
    },
  })
  peseePoudre_?: number[];

  @Prop({ type: String, required: true })
  heureEclatement: string;

  @Prop({ type: Number, required: true })
  volumeEclatement: number;

  @Prop({ type: Number, required: true })
  maisNonEclates: number;
}

@Schema()
export class FinPoste {
  @Prop({ type: String, required: true })
  heure: string;

  @Prop({ type: Boolean, required: true })
  conformeMaterielFin: boolean;

  @Prop({ type: Boolean, required: true })
  nonconformeMaterielFin: boolean;

  @Prop({ type: String, required: true })
  commentsMaterielFin: string;
}

@Schema()
export class ProductOf {

  @Prop({ type: Number, required: true })
  numeroOf!: number;

  @Prop({ type: String, required: true })
  numeroLot!: string;

  @Prop({ type: String, required: true })
  article!: string;

  @Prop({ type: String, required: true, enum: LigneTypeEnum })
  ligne!: LigneTypeEnum;

  @Prop({ type: [DebutProduction], default: [] })
  debutProduction: DebutProduction[];

  @Prop({ type: [ControleHoraire], default: [] })
  controleHoraire: ControleHoraire[];

  @Prop({ type: [Controle4h], default: [] })
  controle4h: Controle4h[];

  @Prop({ type: [FinPoste], default: [] })
  finPoste: FinPoste[];
}

export const DebutProductionSchema =
  SchemaFactory.createForClass(DebutProduction);
export const ControleHoraireSchema =
  SchemaFactory.createForClass(ControleHoraire);
export const Controle4hSchema = SchemaFactory.createForClass(Controle4h);
export const FinPosteSchema = SchemaFactory.createForClass(FinPoste);
//export const ProductOfSchema = SchemaFactory.createForClass(ProductOf);

export const ProductOfSchema = SchemaFactory.createForClass(ProductOf);
