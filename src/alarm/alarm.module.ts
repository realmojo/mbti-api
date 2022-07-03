import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Alarm, AlarmSchema } from './schema/alarm.schema';
import { AlarmController } from './alarm.controller';
import { AlarmService } from './alarm.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Alarm.name, schema: AlarmSchema }]),
  ],
  controllers: [AlarmController],
  providers: [AlarmService],
  exports: [AlarmService],
})
export class AlarmModule {}
