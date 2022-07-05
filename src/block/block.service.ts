import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Block, BlockDocument } from './schema/block.schema';
import { CreateBlockDto } from './dto/create-block.dto';

@Injectable()
export class BlockService {
  constructor(
    @InjectModel(Block.name) private blockModel: Model<BlockDocument>,
  ) { }

  async findOne(userId: string, targetUserId: string): Promise<Block | undefined> {
    return await this.blockModel.findOne({ userId, targetUserId });
  }

  async addBlock(
    createBlockDto: CreateBlockDto,
  ): Promise<Block | undefined> {
    const Block = await this.findOne(
      createBlockDto.userId,
      createBlockDto.targetUserId,
    );
    if (Block) {
      return Block;
    }
    const createBlock = new this.blockModel(createBlockDto);
    return createBlock.save();
  }

  async getBlocks(userId: string): Promise<Block[] | undefined> {
    return await this.blockModel.aggregate([
      { $match: { userId: userId } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: 'id',
          as: 'userInfo',
        },
      },
      { $unwind: '$userInfo' },
      { $sort: { created: -1 } },
    ]);
  }

  async removeBlock(_id: string): Promise<Block | undefined> {
    return await this.blockModel.findByIdAndRemove({ _id });
  }
}
