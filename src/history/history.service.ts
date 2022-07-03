import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { History, HistoryDocument } from './schema/history.schema';
import { CreateHistoryDto } from './dto/create-history.dto';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(History.name) private historyModel: Model<HistoryDocument>,
  ) {}

  async addHistory(
    createHistoryDto: CreateHistoryDto,
  ): Promise<History | undefined> {
    const createHistory = new this.historyModel(createHistoryDto);
    return createHistory.save();
  }

  async getHistory(params): Promise<History | undefined> {
    return await this.historyModel.findOne(params);
  }

  async removeHistoryByPostId(postId: string): Promise<any | undefined> {
    if (postId) {
      return await this.historyModel.remove({ postId });
    }
  }
}
