import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AlarmService } from './alarm.service';
import { Alarm } from './schema/alarm.schema';

@Controller('alarm')
export class AlarmController {
  constructor(private readonly alarmService: AlarmService) {}

  @Get('/:userId')
  async getAlarms(@Param() param): Promise<Alarm[] | undefined> {
    console.log('get alarms');
    const { userId } = param;
    return await this.alarmService.getAlarms(userId);
  }

  // 알람 읽은거
  @Post('/readed/:_id')
  async updateAlarm(@Param() param): Promise<Alarm | undefined> {
    console.log('update alarms');
    const { _id } = param;
    return await this.alarmService.readedAlarm(_id);
  }
}
