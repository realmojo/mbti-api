import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly mbti: string;

  @IsString()
  readonly status: string;

  @IsString()
  readonly created: string;
}
