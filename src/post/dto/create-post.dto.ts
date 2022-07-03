import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly category: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsNumber()
  readonly viewCount: number;

  @IsNumber()
  readonly likeCount: number;

  @IsNumber()
  readonly commentCount: number;

  @IsBoolean()
  readonly isDeleted: boolean;

  @IsNumber()
  readonly created: number;

  @IsNumber()
  readonly updated: number;
}
