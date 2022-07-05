import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Accuse, AccuseDocument } from './schema/accuse.schema';
import { CreateAccuseDto } from './dto/create-accuse.dto';

@Injectable()
export class AccuseService {
  constructor(
    @InjectModel(Accuse.name) private accuseModel: Model<AccuseDocument>,
  ) {}

  async findOne(
    userId: string,
    relativeId: string,
  ): Promise<Accuse | undefined> {
    return await this.accuseModel.findOne({ userId, relativeId });
  }

  async addAccuse(
    createAccuseDto: CreateAccuseDto,
  ): Promise<Accuse | undefined> {
    const Accuse = await this.findOne(
      createAccuseDto.userId,
      createAccuseDto.relativeId,
    );
    if (Accuse) {
      return Accuse;
    }
    const createAccuse = new this.accuseModel(createAccuseDto);
    return createAccuse.save();
  }
}
