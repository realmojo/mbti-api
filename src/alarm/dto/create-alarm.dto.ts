import { IsNumber, IsString } from 'class-validator';
import { ALARM_TYPE } from '../schema/constants';

export class CreateAlarmDto {
  @IsString()
  readonly relativeId: string;

  @IsString()
  readonly targetUserId: string;

  @IsString()
  readonly type: ALARM_TYPE;

  @IsString()
  readonly message: string;

  @IsString()
  readonly isReaded: boolean;

  @IsNumber()
  readonly created: number;
}
