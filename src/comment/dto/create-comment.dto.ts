import { IsNumber, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { COMMENT_STATUS } from '../schema/constants';

export class CreateCommentDto {
  @IsString()
  readonly _id: mongoose.Types.ObjectId;

  @IsString()
  readonly userId: string;

  @IsString()
  readonly postId: string;

  @IsString()
  readonly comment: string;

  @IsNumber()
  readonly likeCount: number;

  @IsString()
  @IsNumber()
  readonly parent: string | number;

  @IsString()
  readonly status: COMMENT_STATUS;

  @IsNumber()
  readonly created: number;
}
