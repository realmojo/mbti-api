import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { POST_STATUS } from './constants';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop()
  userId: string;

  @Prop()
  category: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  image: string;

  @Prop()
  viewCount: number;

  @Prop()
  likeCount: number;

  @Prop()
  commentCount: number;

  @Prop()
  isDeleted: boolean;

  @Prop()
  status: POST_STATUS;

  @Prop()
  created: number;

  @Prop()
  updated: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
