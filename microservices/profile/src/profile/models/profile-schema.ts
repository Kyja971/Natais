import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Profile {
    
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  gender: string;

  @Prop()
  email: string;

  @Prop()
  phonenumber: string;

}

export const ProfileSchema = SchemaFactory.createForClass(Profile);