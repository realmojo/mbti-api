import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ACCUSE_TYPE, STATUS_TYPE } from './constants';

export type AccuseDocument = Accuse & Document;

@Schema()
export class Accuse {
  _id: mongoose.Types.ObjectId;
  @Prop()
  relativeId: string;

  @Prop()
  userId: string;

  @Prop()
  type: ACCUSE_TYPE;

  @Prop()
  status: STATUS_TYPE;

  @Prop()
  created: number;

  @Prop()
  updated: number;
}

export const AccuseSchema = SchemaFactory.createForClass(Accuse);
