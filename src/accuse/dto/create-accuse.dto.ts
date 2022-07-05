import { IsNumber, IsString } from 'class-validator';
import { ACCUSE_TYPE, STATUS_TYPE } from '../schema/constants';

export class CreateAccuseDto {
  @IsString()
  readonly relativeId: string;

  @IsString()
  readonly userId: string;

  @IsString()
  readonly type: ACCUSE_TYPE;

  @IsString()
  readonly status: STATUS_TYPE;

  @IsNumber()
  readonly created: number;

  @IsNumber()
  readonly updated: number;
}
