import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Accuse, AccuseSchema } from './schema/accuse.schema';
import { AccuseController } from './accuse.controller';
import { AccuseService } from './accuse.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Accuse.name, schema: AccuseSchema }]),
  ],
  controllers: [AccuseController],
  providers: [AccuseService],
  exports: [AccuseService],
})
export class AccuseModule {}
