import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Block, BlockSchema } from './schema/block.schema';
import { BlockController } from './block.controller';
import { BlockService } from './block.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Block.name, schema: BlockSchema },
    ]),
  ],
  controllers: [BlockController],
  providers: [BlockService],
  exports: [BlockService],
})
export class BlockModule {}
