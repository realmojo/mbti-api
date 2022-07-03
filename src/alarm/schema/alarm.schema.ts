import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ALARM_TYPE } from './constants';

export type AlarmDocument = Alarm & Document;

@Schema()
export class Alarm {
  _id: mongoose.Types.ObjectId;

  @Prop()
  relativeId: string;

  @Prop()
  targetUserId: string;

  @Prop()
  type: ALARM_TYPE;

  @Prop()
  message: string;

  @Prop()
  isReaded: boolean;

  @Prop()
  created: number;
}

export const AlarmSchema = SchemaFactory.createForClass(Alarm);
