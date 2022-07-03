import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { COMMENT_STATUS } from './constants';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  _id: mongoose.Types.ObjectId;

  @Prop()
  userId: string;

  @Prop()
  postId: string;

  @Prop()
  comment: string;

  @Prop()
  likeCount: number;

  @Prop()
  parent: string;

  @Prop()
  status: COMMENT_STATUS;

  @Prop()
  created: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
