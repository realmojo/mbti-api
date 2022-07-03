import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type BookmarkDocument = Bookmark & Document;

@Schema()
export class Bookmark {
  _id: mongoose.Types.ObjectId;

  @Prop()
  userId: string;

  @Prop()
  postId: string;

  @Prop()
  created: number;
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);
