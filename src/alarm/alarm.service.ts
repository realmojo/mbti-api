import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Alarm, AlarmDocument } from './schema/alarm.schema';
import { CreateAlarmDto } from './dto/create-alarm.dto';

@Injectable()
export class AlarmService {
  constructor(
    @InjectModel(Alarm.name) private alarmModel: Model<AlarmDocument>,
  ) {}

  async addAlarm(createAlarmDto: CreateAlarmDto): Promise<Alarm | undefined> {
    const createAlarm = new this.alarmModel(createAlarmDto);
    return createAlarm.save();
  }

  async getAlarms(targetUserId: string): Promise<Alarm[] | undefined> {
    return await this.alarmModel.aggregate([
      { $addFields: { relativeId: { $toObjectId: '$relativeId' } } },
      { $match: { targetUserId: targetUserId } },
      {
        $lookup: {
          from: 'posts',
          localField: 'relativeId',
          foreignField: '_id',
          as: 'postInfo',
        },
      },
      { $unwind: '$postInfo' },
      { $sort: { created: -1 } },
      { $limit: 20 },
    ]);
  }

  async readedAlarm(_id: string): Promise<Alarm | undefined> {
    const filter = {
      _id,
    };
    const set = {
      $set: { isReaded: true },
    };

    return await this.alarmModel.findByIdAndUpdate(filter, set, { new: true });
  }
}
