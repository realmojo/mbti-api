import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { USER_STATUS } from './constant';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  mbti: string;

  @Prop()
  status: USER_STATUS;

  @Prop()
  created: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
