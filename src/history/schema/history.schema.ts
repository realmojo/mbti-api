import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { HISTORY_TYPE } from './constants';

export type HistoryDocument = History & Document;

@Schema()
export class History {
  _id: mongoose.Types.ObjectId;

  @Prop()
  userId: string;

  @Prop()
  relativeId: string;

  @Prop()
  type: HISTORY_TYPE;

  @Prop()
  created: number;
}

export const HistorySchema = SchemaFactory.createForClass(History);
