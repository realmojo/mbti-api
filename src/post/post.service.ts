import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schema/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { POST_COUNT_TYPE, POST_STATUS } from './schema/constants';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async findOne(id: string): Promise<Post | undefined> {
    return await this.postModel.findOne({ id });
  }

  async addPost(createPostDto: CreatePostDto): Promise<Post | undefined> {
    const createPost = new this.postModel(createPostDto);
    return createPost.save();
  }

  async removePost(_id: string): Promise<Post | undefined> {
    const filter = {
      _id,
    };
    const set = {
      $set: {
        status: POST_STATUS.DELETE,
      },
    };
    return await this.postModel.findByIdAndUpdate(filter, set, { new: true });
  }

  async getPostList({ category, page }): Promise<Post[] | undefined> {
    const limit = 5;
    // const offset = 3;
    const skip = limit * (page - 1);
    console.log(skip, page);
    if (category === 'all') {
      return await this.postModel.aggregate([
        { $match: { status: POST_STATUS.ACTIVE } },
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
        { $skip: skip },
        { $limit: limit },
      ]);
    } else {
      return await this.postModel.aggregate([
        { $match: { category: category } },
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
        { $skip: skip },
        { $limit: limit },
      ]);
    }
  }

  async getMyPostList({ userId, page }): Promise<Post[] | undefined> {
    const limit = 5;
    // const offset = 3;
    const skip = limit * (page - 1);
    return await this.postModel.aggregate([
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
      { $skip: skip },
      { $limit: limit },
    ]);
  }

  async getPost(_id: string): Promise<any | undefined> {
    return await this.postModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(_id) } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: 'id',
          as: 'userInfo',
        },
      },
      { $unwind: '$userInfo' },
      { $limit: 1 },
    ]);
  }

  async addViewCount(_id: string): Promise<any | undefined> {
    return await this.postModel.updateOne({ _id }, { $inc: { viewCount: 1 } });
  }

  async addCommentCount(_id: string, type: string): Promise<any | undefined> {
    const count = type === POST_COUNT_TYPE.PLUS ? 1 : -1;
    return await this.postModel.updateOne(
      { _id },
      { $inc: { commentCount: count } },
    );
  }

  async addLikeCount(_id: string, type: string): Promise<any | undefined> {
    const count = type === POST_COUNT_TYPE.PLUS ? 1 : -1;
    return await this.postModel.updateOne(
      { _id },
      { $inc: { likeCount: count } },
    );
  }
}
