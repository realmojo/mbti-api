import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(id: string): Promise<any | undefined> {
    return await this.userModel.aggregate([
      { $match: { id: id } },
      {
        $lookup: {
          from: 'blocks',
          localField: 'id',
          foreignField: 'userId',
          as: 'blockUserId',
        },
      },
      { $sort: { created: -1 } },
    ]);
  }

  async addUser(createUserDto: CreateUserDto): Promise<User | undefined> {
    const User = await this.findOne(createUserDto.id);
    if (User.length !== 0) {
      return await this.getUser(createUserDto.id);
    }
    const createUser = new this.userModel(createUserDto);
    await createUser.save();
    return await this.getUser(createUserDto.id);
  }

  async getUser(id: string): Promise<any | undefined> {
    const data = await this.findOne(id);

    const blockUserId = [];
    const d = data[0].blockUserId;
    for (const i in d) {
      blockUserId.push(d[i].targetUserId);
    }

    return {
      ...data[0],
      blockUserId,
    };
  }

  async updateUser(params): Promise<User | undefined> {
    const filter = {
      id: params.id,
    };
    const set = {
      $set: { mbti: params.mbti },
    };
    return await this.userModel.findOneAndUpdate(filter, set, { new: true });
  }
}
