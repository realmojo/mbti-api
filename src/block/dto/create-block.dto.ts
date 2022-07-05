import { IsNumber, IsString } from 'class-validator';

export class CreateBlockDto {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly targetUserId: string;

  @IsNumber()
  readonly created: number;
}
