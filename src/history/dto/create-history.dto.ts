import { IsNumber, IsString } from 'class-validator';
import { HISTORY_TYPE } from '../schema/constants';

export class CreateHistoryDto {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly relativeId: string;

  @IsString()
  readonly type: HISTORY_TYPE;

  @IsNumber()
  readonly created: number;
}
