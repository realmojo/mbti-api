import { IsNumber, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateBookmarkDto {
  @IsString()
  readonly _id: mongoose.Types.ObjectId;

  @IsString()
  readonly userId: string;

  @IsString()
  readonly postId: string;

  @IsNumber()
  readonly created: number;
}
