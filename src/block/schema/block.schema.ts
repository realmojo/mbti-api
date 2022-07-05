import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type BlockDocument = Block & Document;

@Schema()
export class Block {
  _id: mongoose.Types.ObjectId;

  @Prop()
  userId: string;

  @Prop()
  targetUserId: string;

  @Prop()
  created: number;
}

export const BlockSchema = SchemaFactory.createForClass(Block);
