import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
  viewCount: number;

  @Prop()
  likeCount: number;

  @Prop()
  commentCount: number;

  @Prop()
  isDeleted: boolean;

  @Prop()
  created: string;

  @Prop()
  updated: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
