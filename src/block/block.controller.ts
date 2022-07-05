import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { BlockService } from './block.service';
import { Block } from './schema/block.schema';

@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post()
  async addBlock(@Body() req): Promise<Block> {
    console.log('add block');
    const params = {
      ...req, // userId, targetUserId,
      created: new Date().getTime(),
    };
    return await this.blockService.addBlock(params);
  }

  @Get('/:userId')
  async getBlokcUsers(@Param() param): Promise<Block[] | undefined> {
    const { userId } = param;
    return this.blockService.getBlokcUsers(userId);
  }

  @Delete('/:_id')
  async removeBlock(@Param() param): Promise<Block | undefined> {
    const { _id } = param;
    return this.blockService.removeBlock(_id);
  }
}
